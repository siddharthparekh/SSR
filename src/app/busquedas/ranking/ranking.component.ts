import { Component, OnInit, TemplateRef, AfterViewInit, Renderer2, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IOption } from "ng-select";
import { ToastOptions, ToastyConfig, ToastyService } from "ng2-toasty";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { combineLatest, Subject, Observable } from "rxjs";
import { map, takeUntil, tap, filter } from "rxjs/operators";

import { IProducto } from "../../_models/Producto";
import { ProfesionalService } from "../../_services/profesional.service";
import { ProvinciasService } from "../../_services/provincias.service";
import { ShoppingCarService } from "../../_services/shopping.car.service";
import { ToastOptionsClass } from "../../_utils/toastOptionsClass";
import { IDerecho } from "./../../_models/Derecho";
import { ComunidadesService } from "./../../_services/comunidades.service";
import { RightService } from "./../../_services/right.service";
import { SharedUserService } from "./../../_services/shared-user.service";
import { ZohoService } from "./../../_services/zoho.service";
import { updateShoppingCarTrigger } from "../../_utils/utilFunctions";

const comunidadDefault: string = "Comunidad de Madrid";
const provinciaDefault: string = "MADRID";
const derechoDefault: string = "Derecho de familia";

@Component({
	selector: "app-ranking",
	templateUrl: "./ranking.component.html",
	styleUrls: ["./ranking.component.css"],
	providers: [
		ProfesionalService,
		RightService,
		ProvinciasService,
		ComunidadesService,
		ShoppingCarService,
		ZohoService
	]
})
export class RankingComponent implements OnInit, OnDestroy {
	modalRef: BsModalRef;
	limit: number = 7;
	abogados: any[] = [];
	warnings: any = {};
	terminoBuscado: string = derechoDefault;
	materiaBuscada: string = '';
	nResults: number;
	showEmptySearch = false;
	reqInProg = true;
	hideAbogados = true;
	queryParams: any = {};
	orderBy: string = "nombreAsc";
	searchType: string = "right";
	page: number = 0;
	nombreDerechoUrl: string;
	nombreMateriaUrl: string;
	derechos: Array<IOption>;
	typeDerecho$: Subject<string> = new Subject<string>();
	provincias: IOption[];
	provincia: string = provinciaDefault;
	comunidades: IOption[];
	comunidad: string = comunidadDefault;
	selected_tab: string = "";
	return_url: string = "/ranking";
	productosCarrito: IProducto[] = [];
	ngUnsubscribe = new Subject<void>();
	abogado: any;
	derechosOriginales: any[];
	derechosOnly: any[];
	derechoInicial: IOption = {
		label: "",
		value: '',
	};
	inputChange = new Subject<string>();

	constructor(private toastOptionsClass: ToastOptionsClass,
		private toastyService: ToastyService,
		private toastyConfig: ToastyConfig,
		private router: Router,
		private title: Title,
		private route: ActivatedRoute,
		private profesionalService: ProfesionalService,
		private derechosService: RightService,
		private modalService: BsModalService,
		private sharedUserService: SharedUserService,
		private provinciasService: ProvinciasService,
		private comunidadesService: ComunidadesService,
		private shoppingCarService: ShoppingCarService,
		private rendered: Renderer2,
		private zohoService: ZohoService
	) {
		this.toastyConfig.theme = "default";
	}

	ngOnInit() {
		// MOSTRAR DERECHOS AL INICIO
		this.loadDerechos();
		// BUSCAR POR MATERIA
		this.loadMaterias();
		this.fetchProvincias();
		this.fetchComunidades();
		this.get_products();
	}
	loadDerechos() {
		this.derechosService
			.findDerechos()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(derechos => {
				this.derechosOriginales = derechos;
				this.derechosOnly = derechos;
				this.derechos = this.cloneOptionsRights(derechos);
				this.selected_tab = "state";
				const routerEvents = combineLatest(
					this.route.params,
					this.route.queryParams
				);
				this.handleUrlParams(routerEvents, derechos);
			}, err => {
				this.dispayToast(err)
			});
	}
	loadMaterias() {
		this.derechosService
			.searchMateriasYDerechos(this.inputChange)
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(derechos => {
				this.derechosOriginales = [...derechos];
				this.derechos = this.cloneMateriasOptionsRights(derechos);
				const routerEvents = combineLatest(
					this.route.params,
					this.route.queryParams
				);
				// console.log('loadMaterias', derechos, 'terminoBuscado', this.terminoBuscado);
				// this.handleUrlParams(routerEvents, derechos);
				if (this.nombreMateriaUrl && this.terminoBuscado) {
					const nombrederechomateria = this.parseDerechoMateriaUrl(this.materiaBuscada, derechos as any);
					// if (!nombrederechomateria) {
					// 	console.log('DERECHO Y MATERIA NO ENCONTRADO', nombrederechomateria);
					// 	this.router.navigate(["/404"]);
					// }
				}
			}, err => {
				this.dispayToast(err)
			});
	}
	handleUrlParams(routerEvents, derechos) {
		routerEvents
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(([params, qparams]) => {
				this.materiaBuscada = '';
				this.nombreMateriaUrl = '';
				// console.log('handleUrlParams', params, qparams, derechos);
				this.nombreDerechoUrl = params["derecho"];
				this.nombreMateriaUrl = params["materia"];
				if (this.nombreMateriaUrl) {
					this.terminoBuscado = this.parseDerechoMateria(this.nombreDerechoUrl) + ' (' + this.parseDerechoMateria(this.nombreMateriaUrl) + ')';
					this.materiaBuscada = this.parseDerechoMateria(this.nombreDerechoUrl);
					this.onFilterInputChanged(this.parseDerechoMateria(this.nombreMateriaUrl));
				} else {
					if (!this.isRightUrlValid(this.derechosOnly, this.nombreDerechoUrl)) {
						this.router.navigate(["/404"]);
					}
					this.terminoBuscado = this.parseDerechoUrl(this.nombreDerechoUrl, derechos) || derechoDefault;
				}
				this.queryParams = Object.assign({}, qparams);
				this.page = <number>qparams["page"] === undefined ? 1 : parseInt(qparams["page"]);
				if (this.queryParams.provincia) {
					this.selected_tab = 'province';
					this.provincia = this.queryParams.provincia;
				}
				if (this.queryParams.comunidad) {
					this.selected_tab = 'comunnity';
					this.comunidad = this.queryParams.comunidad;
				}
				this.return_url = '/ranking/' + this.nombreDerechoUrl || '';
				this.searchLawyer(this.queryParams);
			});
	}
	searchLawyer(params) {
		var paramsSearch = {
			limit: this.limit,
			offset: this.limit * this.page - this.limit,
			antiguedad_lower: params.antiguedad_lower,
			antiguedad_upper: params.antiguedad_upper,
			provincia: params.provincia,
			comunidad: params.comunidad,
			orderBy: "irj"
		};
		// console.log('searchLawyer', 'paramsSearch', paramsSearch, 'terminoBuscado', this.terminoBuscado, 'materiaBuscada', this.materiaBuscada);
		if (this.terminoBuscado) {
			if (this.page > 1)
				this.hideAbogados = false;
			else
				this.hideAbogados = true;
			this.reqInProg = true;

			this.profesionalService
				.searchRanking(this.materiaBuscada ? this.materiaBuscada : this.terminoBuscado, paramsSearch)
				.pipe(
					tap(users => {
						this.nResults = users.nResults;
						this.setShowEmptySearch();
						this.reqInProg = false;
						this.hideAbogados = true;
					}),
					map(users => users.data)
				)
				.pipe(takeUntil(this.ngUnsubscribe))
				.subscribe(users => {
					if (!this.page || this.page == 1) {
						this.abogados = users;
					} else {
						this.abogados = this.abogados.concat(users);
					}
				}, err => {
					this.dispayToast(err)
					this.setShowEmptySearch();
					this.reqInProg = false;
					this.hideAbogados = true;
				});
		} else {
			this.setShowEmptySearch();
			this.reqInProg = false;
			this.hideAbogados = true;
		}
	}
	dispayToast(err) {
		var toast: ToastOptions = this.toastOptionsClass.toastOptions;
		toast.msg = err;
		this.toastyService.error(toast);
	}
	setShowEmptySearch() {
		this.showEmptySearch = this.nResults === 0 || undefined === this.nResults;
	}
	clickedGoBack(): void {
		this.showEmptySearch = false;
	}
	goToProfile(id: number, idx: number) {
		let profesional = this.abogados.find(
			abogado => abogado.ProfesionalesEstadistica.id == id
		);
		if (!profesional) throw new Error("id abogado no encontrado");
		const url = this.sharedUserService.getProfileUrl(null, true, {
			userId: profesional.ProfesionalesEstadistica.id
		});
		// console.log(this.derechosOriginales, this.terminoBuscado);
		let derecho = this.derechosOriginales.find(derecho => derecho.nombre == this.terminoBuscado);
		if (this.materiaBuscada && this.nombreMateriaUrl) {
			derecho = this.derechosOriginales.find(
				derecho => this.normalizeString(derecho.nombre.toLowerCase() + ' (' + derecho.derechoConcreto.toLowerCase() + ')') == this.normalizeString(this.terminoBuscado.toLowerCase())
			);
		}
		if (!derecho) throw new Error("Derecho no encontrado");
		const categoria = this.queryParams.antiguedad_lower > -1 || this.queryParams.antiguedad_upper > -1 ? true : undefined;
		let alcance = profesional.productos && profesional.productos.length > 0 && profesional.productos[0].alcance;
		alcance = alcance === "estatal" ? undefined : alcance;
		this.router.navigate(url, { queryParams: { d: derecho.id, c: categoria, a: alcance } });
	}
	/**
	 * redirige a la pagina actual cambiando los queryparams
	 */
	setQueryParams(filterParams) {
		let routeArray = ["/ranking"];
		const { right, materia, ...queryParams } = filterParams;
		// console.log('filterParams en Ranking', this.terminoBuscado, filterParams);
		if (materia) {
			this.terminoBuscado = right + ' (' + materia + ')';
		} else {
			this.terminoBuscado = right;
		}
		this.nombreDerechoUrl = right && this.sharedUserService.formatUrlString(right);
		this.nombreMateriaUrl = materia && this.sharedUserService.formatUrlString(materia);
		if (this.nombreDerechoUrl) routeArray.push(this.nombreDerechoUrl);
		if (this.nombreMateriaUrl) routeArray.push(this.nombreMateriaUrl);
		this.router.navigate(routeArray, { queryParams: queryParams });
	}

	quick_filter(filtersParams?: any) {
		this.page = 1;
		let filtersQueryParams = filtersParams || this.queryParams || {};
		switch (this.selected_tab) {
			case "province":
				delete this.queryParams.comunidad;
				filtersQueryParams.provincia = this.provincia;
				break;
			case "comunnity":
				delete this.queryParams.provincia;
				filtersQueryParams.comunidad = this.comunidad;
				break;
			default:
				delete this.queryParams.provincia;
				delete this.queryParams.comunidad;
				break;
		}
		if (this.comunidad) {
			this.queryParams.comunidad = this.comunidad;
			delete this.queryParams.provincia;
		}
		if (this.provincia) {
			this.queryParams.provincia = this.provincia;
			delete this.queryParams.comunidad;
		}
		if (this.terminoBuscado && this.terminoBuscado.indexOf('(') !== -1 && this.terminoBuscado.indexOf(')') !== -1) {
			let indexim = this.terminoBuscado.indexOf('(');
			let indexfm = this.terminoBuscado.indexOf(')');
			let derechoNombre = this.terminoBuscado.substring(0, indexim - 1);
			let materiaNombre = this.terminoBuscado.substring(indexim + 1, indexfm);
			this.nombreDerechoUrl = this.sharedUserService.formatUrlString(derechoNombre);
			this.nombreMateriaUrl = this.sharedUserService.formatUrlString(materiaNombre);
			filtersQueryParams.right = derechoNombre;
			filtersQueryParams.materia = materiaNombre;
		} else if (this.terminoBuscado) {
			this.nombreDerechoUrl = this.sharedUserService.formatUrlString(this.terminoBuscado);
			filtersQueryParams.right = this.terminoBuscado;
		}
		this.setQueryParams(filtersQueryParams);
	}

	applyFilter(filtersParams?: any) {
		$("#modal-filter-dialog")["modal"]("hide");
		this.quick_filter(filtersParams);
	}
	searchRanking() {
		this.applyFilter();
	}
	fetchNextSet() {
		this.page++;
		this.searchLawyer(this.queryParams);
	}
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}
	isRightUrlValid(derechos: IDerecho[], rightNameFromUrl: string): boolean {
		if (rightNameFromUrl === undefined) return true;
		for (let i = 0; i < derechos.length; i++) {
			if (
				this.sharedUserService.formatUrlString(derechos[i].nombre) ==
				rightNameFromUrl
			) {
				return true;
			}
		}
		return false;
	}
	parseDerechoUrl(derechoUrl: string, derechos: IDerecho[]): string {
		for (let i = 0; i < derechos.length; i++) {
			if (
				this.sharedUserService.formatUrlString(derechos[i].nombre) == derechoUrl
			) {
				return derechos[i].nombre;
			}
		}
		return undefined;
	}
	parseDerechoMateriaUrl(derecho: string, derechos: IDerecho[]): string {
		for (let i = 0; i < derechos.length; i++) {
			if (
				this.normalizeString(derechos[i].nombre.toLocaleLowerCase()) == this.normalizeString(derecho.toLocaleLowerCase())
			) {
				return derechos[i].nombre;
			}
		}
		return undefined;
	}
	normalizeString (texto: string) {
		return texto.split('').map(function (letter) {
			let i = this.accents.indexOf(letter)
			return (i !== -1) ? this.out[i] : letter
		  }.bind({
			accents: 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź',
			out: 'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz'
		  })
		).join('')
	  }
	parseDerechoMateria(derechoMateriaUrl: string): string {
		derechoMateriaUrl = this.sharedUserService.formatStringUrl(derechoMateriaUrl);
		return derechoMateriaUrl.charAt(0).toUpperCase() + derechoMateriaUrl.slice(1);
	}
	fetchProvincias() {
		this.provincias = this.provinciasService.getProvincias().map(option => {
			return { value: option.text, label: option.text };
		});
	}
	fetchComunidades() {
		this.comunidades = this.comunidadesService.getComunidades().map(option => {
			return { value: option.text, label: option.text };
		});
	}
	go_to_directory() {
		if (this.nombreDerechoUrl)
			this.router.navigate(["/directorio", this.nombreDerechoUrl], { queryParams: this.queryParams });
		else this.router.navigate(["/directorio"], { queryParams: this.queryParams });
	}
	show_filter() {
		$("#modal-filter-dialog")["modal"]("show");
	}

	get_products() {
		this.shoppingCarService
			.products()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((products: IProducto[]) => this.productosCarrito = products, err => this.dispayToast(err));
	}

	addProducto(producto: IProducto) {
		if (!producto) throw new Error("producto no encontrado");
		this.shoppingCarService.save_product(producto).subscribe((product) => {
			updateShoppingCarTrigger.next();
			$('#modal-specilist-contract-plans')['modal']('hide');
			this.goToCart();
		})
	}

	plan(abogado: any) {
		this.abogado = abogado;
		setTimeout(() => {
			$('#modal-specilist-contract-plans')['modal']('show');
		}, 200);
	}

	showProximamente(product: any) {
		$('#modal-profile-contract-plans')['modal']('hide');
		$('#modal-specilist-contract-plans')['modal']('hide');
		setTimeout(() => $('#modal-profile-contract-plan-analitico')['modal']('show'), 200);
	}

	onClear() {
		// console.log('onClear');
	}

	goToCart() {
		// const redirect = this.route.snapshot['_routerState'].url;
		const queryParams = this.queryParams;
		let redirect = '/ranking';
		if (this.nombreDerechoUrl) {
			redirect += '/' + this.nombreDerechoUrl;
		}
		queryParams['redirect'] = redirect;
		this.router.navigate(['/cart'], {
			queryParams: queryParams
		});
	}

	private cloneOptionsRights(options: Array<any>): Array<IOption> {
		return options.map(option => ({
			value: option.nombre,
			label: option.nombre
		}));
	}

	private cloneMateriasOptionsRights(options: Array<any>): Array<IOption> {
		return options.map(option => ({
			// value: option.nombre,
			value: this.normalizeString(option.derechoConcreto ? `${option.nombre} (${option.derechoConcreto})` : option.nombre),
			label: option.derechoConcreto ? `${option.nombre} (${option.derechoConcreto})` : option.nombre,
		}));
	}

	onSelectedDerecno(element: IOption) {
		// console.log('IOption selected:', element);
	}

	noseCual() {
		this.zohoService.ayudaAreaDerecho();
	}

	clickEstatal() {
		this.comunidad = undefined;
		this.provincia = undefined;
		this.quick_filter()
	}

	clickCCAA() {
		if (!this.comunidad) this.comunidad = comunidadDefault;
		this.provincia = undefined;
		this.quick_filter()
	}

	clickProvincia() {
		if (!this.provincia) this.provincia = provinciaDefault;
		this.comunidad = undefined;
		this.quick_filter()
	}

	onFilterInputChanged(searchTerm: string) {
		if (searchTerm) {
			this.inputChange.next(searchTerm);
		} else {
			this.loadDerechos();
		}
	}

	ngOnDestroy(): void {
		// $('.modal')['modal']('hide');
		// $(document.body).removeClass("modal-open");
		// $(".modal-backdrop").remove();
	}

}
