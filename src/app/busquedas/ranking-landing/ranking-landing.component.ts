import { Component, OnInit, TemplateRef, AfterViewInit, Renderer2, ViewChild, ElementRef, Input, Output, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { IOption, SelectComponent } from "ng-select";
import { ToastOptions, ToastyConfig, ToastyService } from "ng2-toasty";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { combineLatest, Subject } from "rxjs";
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
import { updateShoppingCarTrigger, UtilFunctions } from "../../_utils/utilFunctions";

const comunidadDefault: string = "Comunidad de Madrid";
const provinciaDefault: string = "MADRID";

@Component({
   selector: "app-ranking-landing",
   templateUrl: "./ranking-landing.component.html",
   styleUrls: ["./ranking-landing.component.css"],
   providers: [
      ProfesionalService,
      RightService,
      ProvinciasService,
      ComunidadesService,
      ShoppingCarService,
      ZohoService
   ]
})
export class RankingLandingComponent implements OnInit {
   modalRef: BsModalRef;
   limit: number = 5;
   abogados: any[] = [];
   warnings: any = {};
   terminoBuscado: string = "";
   nResults: number;
   showEmptySearch = false;
   reqInProg: boolean = false;
   queryParams: any = {};
   orderBy: string = "nombreAsc";
   searchType: string = "right";
   page: number = 0;
   nombreDerechoUrl: string;
   derechos: Array<IOption>;
   typeDerecho$: Subject<string> = new Subject<string>();
   provincias: IOption[];
   provincia: string = provinciaDefault;
   comunidades: IOption[];
   comunidad: string = comunidadDefault;
   selected_tab: string = "";
   return_url: string = "/especialidades/ranking-landing";
   productosCarrito: IProducto[] = [];
   ngUnsubscribe = new Subject<void>();
   abogado: any;


   // antiguedadGroup: string[] = ["TODOS", "JUNIOR", "INTERMEDIATE", "ADVANCED", "SENIOR"];
   antiguedadGroup: IOption[] = [{
      label: "TODOS",
      value: "none"
   }, {
      label: "JUNIOR - 0 a 5 años",
      value: "0-5"
   }, {
      label: "INTERMEDIATE - 6 a 10 años",
      value: "6-10"
   }, {
      label: "ADVANCED - 11 a 15 años",
      value: "11-15"
   }, {
      label: "SENIOR - más de 15 años",
      value: "16-100"
   }];

   antiguedadSeleccionada: string;

   selectedPlace: string = "";
   derechoTitle: string = ""

   @Input() derecho: string;
   @Input() prov: string;
   @Input() comun: string;

   @ViewChild('selectBuscarPorDerecho') select: SelectComponent;

   derechosOriginales: IDerecho[];

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
   openSelect() {
      if (this.select) this.select.open();
   }
   ngOnInit() {
      this.derechosService
         .findDerechos()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(derechos => {
            this.derechosOriginales = derechos;
            this.derechos = this.cloneOptionsRights(derechos);
            this.selected_tab = "province";
            this.handleInputParams(derechos);
         }, err => {
            this.dispayToast(err)
            this.handleInputParams([]);
         });
      this.fetchProvincias();
      this.fetchComunidades();
   }
   handleInputParams(derechos) {

      // Default antiguedad: TODOS
      this.antiguedadSeleccionada = "none";

      this.nombreDerechoUrl = this.derecho;
      // this.terminoBuscado = this.derecho.replace(/\-/g, ' ').toLowerCase();;

      if (!this.isRightUrlValid(derechos, this.nombreDerechoUrl)) {
         this.router.navigate(["/404"]);
      }
      this.terminoBuscado = this.parseDerechoUrl(this.nombreDerechoUrl, derechos);

      // let derechoFormatted: string = this.derecho.replace(/\-/g, ' ').toLowerCase();
      // this.derechoTitle = derechoFormatted.charAt(0).toUpperCase() + derechoFormatted.slice(1).toLocaleLowerCase();
      this.derechoTitle = this.parseDerechoUrl(this.derecho, derechos);

      this.page = 1

      if (this.prov == "" && this.comun == "") {
         this.selected_tab = "state";
         this.provincia = undefined;
         this.comunidad = undefined;
      }
      if (this.prov != "") {
         this.selected_tab = "province";
         this.comunidad = undefined;
         this.selectedPlace = this.prov;
         this.provincia = this.prov;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.prov);
      }
      if (this.comun != "") {
         this.selected_tab = "community";
         this.provincia = undefined;
         this.selectedPlace = this.comun;
         this.comunidad = this.comun;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.comun);
      }

      this.searchLawyer();
   }
   searchLawyer() {

      if (this.selected_tab == "community") {
         this.provincia = undefined;
         if (!this.comunidad) this.comunidad = comunidadDefault;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.comunidad);
      }
      if (this.selected_tab == "province") {
         this.comunidad = undefined;
         if (!this.provincia) this.provincia = provinciaDefault;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.provincia);
      }
      if (this.selected_tab == 'state') {
         this.provincia = undefined;
         this.comunidad = undefined;
      }

      let antiguedad_up = null;
      let antiguedad_low = null;

      if (this.antiguedadSeleccionada != undefined && this.antiguedadSeleccionada != "none") {
         antiguedad_low = parseInt(this.antiguedadSeleccionada.split("-")[0]);
         antiguedad_up = parseInt(this.antiguedadSeleccionada.split("-")[1]);
      } else {
         antiguedad_low = null;
         antiguedad_up = null;
      }

      var paramsSearch = {
         limit: this.limit,
         offset: this.limit * this.page - this.limit,
         antiguedad_lower: antiguedad_low,
         antiguedad_upper: antiguedad_up,
         provincia: this.provincia,
         comunidad: this.comunidad,
         orderBy: "irj"
      };

      if (this.terminoBuscado) {
         this.reqInProg = true;
         this.profesionalService
            .searchRanking(this.terminoBuscado, paramsSearch)
            .pipe(
               tap(users => {
                  this.nResults = users.nResults;
                  this.setShowEmptySearch();
                  this.reqInProg = false;
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
            });
      } else {
         this.setShowEmptySearch();
         this.reqInProg = false;
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
      const derecho = this.derechosOriginales.find(derecho => derecho.nombre == this.terminoBuscado);
      if (!derecho) throw new Error("Derecho no encontrado");
      const categoria = (this.antiguedadSeleccionada != undefined && this.antiguedadSeleccionada != "none") ? true : undefined;
      const alcance = this.provincia ? 'provincial' : this.comunidad ? 'comunitario' : undefined;
      this.router.navigate(url, { queryParams: { d: derecho.id, c: categoria, a: alcance } });
   }
   goToRanking() {
      let queryParams = {} as any;
      if (this.comunidad) queryParams.comunidad = this.comunidad;
      if (this.provincia) queryParams.provincia = this.provincia;
      if (this.antiguedadSeleccionada != "none" && this.antiguedadSeleccionada != undefined) {
         queryParams.antiguedad_lower = parseInt(this.antiguedadSeleccionada.split("-")[0]);
         queryParams.antiguedad_upper = parseInt(this.antiguedadSeleccionada.split("-")[1]);
      }
      this.router.navigate(["/ranking/" + this.nombreDerechoUrl], { queryParams });
   }
   /**
    * redirige a la pagina actual cambiando los queryparams
    */
   setQueryParams(filterParams) {
      let routeArray = ["/especialidades"];
      const { right, ...queryParams } = filterParams;
      this.terminoBuscado = right;
      this.nombreDerechoUrl = right && this.sharedUserService.formatUrlString(right);
      if (this.nombreDerechoUrl) routeArray.push(this.nombreDerechoUrl);
      this.router.navigate(routeArray, { queryParams: queryParams });
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
         this.router.navigate(["/directorio", this.nombreDerechoUrl]);
      else this.router.navigate(["/directorio"]);
   }
   show_filter() {
      $("#modal-filter-dialog")["modal"]("show");
   }

   plan(abogado: any) {
      this.abogado = abogado;
      setTimeout(() => {
         $('#modal-specilist-contract-plans')['modal']('show');
      }, 200);
   }
   private cloneOptionsRights(options: Array<any>): Array<IOption> {
      return options.map(option => ({
         value: option.nombre,
         label: option.nombre
      }));
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

   showProximamente(product: any) {
      $('#modal-profile-contract-plans')['modal']('hide');
      $('#modal-specilist-contract-plans')['modal']('hide');
      setTimeout(() => $('#modal-profile-contract-plan-analitico')['modal']('show'), 200);
   }
   goToCart() {
      // const redirect = this.route.snapshot['_routerState'].url;
      const queryParams = this.queryParams;
      let redirect = '/directorio';
      if (this.nombreDerechoUrl) {
         redirect += '/' + this.nombreDerechoUrl;
      }
      queryParams['redirect'] = redirect;
      this.router.navigate(['/cart'], {
         queryParams: queryParams
      });
   }

   parseParamUrl(paramUrl: string, options: IOption[]): string {
      for (let i = 0; i < options.length; i++) {
         if (
            this.sharedUserService.formatUrlString(options[i].label) == paramUrl
         ) {
            return options[i].value;
         }
      }
      return undefined;
   }
   onTabComunity() {
      this.selected_tab = "community";
      if (!this.comunidad) this.comunidad = comunidadDefault;
      this.provincia = undefined;
      this.searchLawyer();
   }
   onTabProvince() {
      this.selected_tab = "province";
      if (!this.provincia) this.provincia = provinciaDefault;
      this.comunidad = undefined;
      this.searchLawyer();
   }
}
