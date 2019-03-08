import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IOption, SelectComponent } from 'ng-select';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { IProducto } from '../../_models/Producto';
import { ProfesionalService } from '../../_services/profesional.service';
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { IDerecho } from './../../_models/Derecho';
import { RightService } from './../../_services/right.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { updateShoppingCarTrigger } from '../../_utils/utilFunctions';

const derechoDefault = "derecho-de-familia"
const comunidadDefault = "Comunidad de Madrid"

@Component({
   selector: "app-search",
   templateUrl: "./search.component.html",
   styleUrls: ["./search.component.css"],
   providers: [ProfesionalService, RightService, ShoppingCarService]
})
export class SearchComponent implements OnInit, OnDestroy {
   modalRef: BsModalRef;
   limit: number = 7;
   abogados: any[];
   warnings: any = {};
   nResults: number;
   reqInProg = true;
   hideAbogados = true;
   filterParams: any = {};
   typeNombre$: Subject<string> = new Subject<string>();
   nombresTypehead: any[];
   orderBy: string = 'nombreAsc';
   nombreDerechoUrl: string;
   derechoBuscado: string;
   ngUnsubscribe = new Subject<void>();
   open_filter: boolean = false;
   type_names: string = '';
   return_url: string = '/directorio';
   productosCarrito: IProducto[];
   abogado: any;
   showEmptySearch: boolean;
   searchTypeName$ = new Subject<string>();
   page = 1;
   isMobile: boolean;
   noMoreResults = false;

   constructor(private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private router: Router,
      private title: Title,
      private route: ActivatedRoute,
      private profesionalService: ProfesionalService,
      private derechosService: RightService,
      private modalService: BsModalService,
      private sharedUserService: SharedUserService,
      private meta: Meta,
   ) {
   }
   ngOnInit() {
      this.setListener();
      const routerEvents = combineLatest(this.route.params, this.route.queryParams);
      this.handleUrlParams(routerEvents);
      // this.searchTypeName$.next('');
      this.showMobileFilter();
      this.setMetas();
   }
   showMobileFilter() {
      this.isMobile = window.innerWidth < 768 ? true : false;
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
      this.unsetMetas();
   }
   search_by_name(event: any) {
      this.searchTypeName$.next(event);
   }
   onSearchByNameChange(e) {
      if (e && e.value >= 0) {
         this._goToProfile(e.label, e.value);
      }
   }
   goToProfile(id: number) {
      let profesional = this.abogados.find(abogado => abogado.Profesional.id == id);
      if (!profesional) throw new Error("id abogado no encontrado");
      this._goToProfile(profesional.Usuario.nombre, profesional.Profesional.id);
   }
   _goToProfile(name: string, id: number) {
      if (!name || id === undefined || id === null) throw new Error("id abogado no encontrado");
      const url = this.sharedUserService.getProfileUrl(null,
         false,
         { userName: name, userId: id });
      this.router.navigate(url);
   }
   handleUrlParams(routerEvents) {
      routerEvents.pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(([params, qparams]) => {
            this.nombreDerechoUrl = params.derecho;
            this.filterParams = { ...qparams };
            this.filterParams.right = this.sharedUserService.formatStringUrl(this.nombreDerechoUrl);
            this.filterParams.materia = this.sharedUserService.formatStringUrl(params.materia);
            this.filterParams.page = <number>qparams['page'] === undefined ? 1 : parseInt(qparams['page']);
            this.searchLawyer(this.filterParams);
         });
   }
   searchLawyer(params) {
      if (params.page > 1)
         this.hideAbogados = false;
      else
         this.hideAbogados = true;
      this.reqInProg = true;

      var paramsSearch = {
         right: params.right,
         materia: params.materia,
         limit: this.limit,
         offset: (this.limit * params.page) - this.limit,
         antiguedad_lower: params.antiguedad_lower,
         antiguedad_upper: params.antiguedad_upper,
         consultas: params.consultas,
         telefono: params.telefono,
         // distancia: params.location && params.location.distanceDesired && params.location.distanceDesired,
         // lat: params.location && params.location.lat && params.location.lat,
         // lon: params.location && params.location.lon && params.location.lon,
         provincia: params.provincia && params.provincia,
         comunidad: params.comunidad && params.comunidad,
         orderBy: this.orderBy,
      };
      this.profesionalService.searchUsers(params.q, paramsSearch).pipe(tap(data => {
         this.nResults = data.nResults;
         this.warnings = data.warnings;
         this.reqInProg = false;
         this.hideAbogados = true;
      }, err => {
         var toast: ToastOptions = this.toastOptionsClass.toastOptions;
         toast.msg = err;
         this.toastyService.error(toast);
         this.setShowEmptySearch();
         this.reqInProg = false;
         this.hideAbogados = true;
      }), map(data => data.data)).pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
         if (!this.filterParams || !this.filterParams.page || this.filterParams.page == 1) {
            this.abogados = users;
            this.noMoreResults = false;
         } else {
            if (users && users.length == 0 && this.filterParams.page > 1) this.noMoreResults = true;
            this.abogados = this.abogados.concat(users);
         }
         this.setShowEmptySearch();
      });
   }
   setShowEmptySearch() {
      this.showEmptySearch = (!this.abogados || (this.abogados && this.abogados.length === 0 && this.page == 1));
   }
   clickedGoBack(): void {
      this.router.navigate(["/directorio"]);
   }
	/**
	 * redirige a la pagina actual cambiando los queryparams
	 */
   setQueryParams(filterParams) {
      let routeArray = ['/directorio'];
      const { right, materia, ...queryParams } = filterParams;
      this.derechoBuscado = right;
      this.nombreDerechoUrl = right && this.sharedUserService.formatUrlString(right);
      const nombreMateriaUrl = materia && this.sharedUserService.formatUrlString(materia);
      if (this.nombreDerechoUrl) routeArray.push(this.nombreDerechoUrl);
      if (nombreMateriaUrl) routeArray.push(nombreMateriaUrl);
      this.router.navigate(routeArray, { queryParams: queryParams });
   }
   apply_Filter_modal(filtersParams?: any) {
      $('#modal-filter-dialog')['modal']('hide');
      this.applyFilter(filtersParams);
   }
   applyFilter(paramsFromFilter?: any) {
      this.filterParams.page = 1;
      let filterParams = paramsFromFilter || this.filterParams;
      this.setQueryParams(filterParams);
   }
   fetchNextSet() {
      this.filterParams.page++;
      this.searchLawyer(this.filterParams);
   }
   irA(pagina: number) {
      this.filterParams.page = pagina;
      this.setQueryParams(this.filterParams);
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
            this.sharedUserService.formatStringUrl(derechos[i].nombre) == derechoUrl
         ) {
            return derechos[i].nombre;
         }
      }
      return undefined;
   }
   onSelectOrderBy(orderType: string) {
      this.orderBy = orderType;
      this.filterParams.orderBy = this.orderBy;
      this.applyFilter();
   }

   go_to_ranking() {
      let filterParams = null;
      if (this.filterParams) {
         filterParams = this.filterParams;
         delete filterParams['page'];
      }
      if (this.nombreDerechoUrl)
         this.router.navigate(['/ranking', this.nombreDerechoUrl], { queryParams: filterParams })
      else
         this.router.navigate(['/ranking'], { queryParams: filterParams })
   }
   show_filter() {
      $('#modal-filter-dialog')['modal']('show');
   }
   setListener() {
      this.searchTypeName$
         .pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => {
               this.nombresTypehead = [{
                  label: '',
                  value: -50
               }]
               return this.profesionalService.searchProfesionalByName(term);
            })
         )
         .subscribe(
            results => {
               this.nombresTypehead = results.map((element: any) => {
                  return {
                     label: element.nombre,
                     value: element.id
                  }
               })
            },
            err => {
               console.log(err);
               this.nombresTypehead = [];
            }
         )
   }
   setMetas() {
      this.meta.removeTag("name='robots'");
      this.meta.addTag({ name: "description", content: "Encuentra al abogado adecuado en el primer directorio que agrupa a los mejores especialistas puntuados según su eficacia demostrada en casos reales." });
      this.title.setTitle("Directorio de abogados especialistas | Emérita Legal");
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag("name='description'");
   }

}