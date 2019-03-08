import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IDerecho } from './../../_models/Derecho';
import { IOption } from 'ng-select';
import { ProvinciasService } from '../../_services/provincias.service';
import { ComunidadesService } from './../../_services/comunidades.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { ZohoService } from './../../_services/zoho.service';
import { RightService } from '../../_services/right.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';

declare var $: any;

@Component({
   selector: 'app-filtro',
   templateUrl: './filtro.component.html',
   styleUrls: ['./filtro.component.css'],
   providers: [ProvinciasService, ComunidadesService, ZohoService]
})
export class FiltroComponent implements OnInit, OnChanges {
   priceRange: number[] = [30, 400];
   antiguedadRange: number[] = [0, 50];
   location: { lat?: number, lon?: number, distanceDesired: number } = { distanceDesired: 50 };
   ubicationOptionFilter: string;
   isGeoEnabled: boolean;
   wasCalledGeo = false;
   provincias: Array<IOption> = [];
   provincia: any;
   derechoBuscado: string;
   comunidades: Array<IOption> = [];
   comunidad: any;
   filterQueryParams: any = {};
   ngUnsubscribe = new Subject<void>();
   derechosOriginales: any[];
   derechosOnly: any[];
   derechoInicial: IOption = {
      label: "",
      value: '',
   };
   nombreDerechoUrl: string;
   derechos: IOption[];
   inputChange = new Subject<string>();
   materiaBuscada: string = '';
   nombreMateriaUrl: string;
   terminoBuscado: string;
   consultas: number = 0;
   telefono: number = 0;

   @Input() filtersFromUrl: any;
   @Output() filterAppliedEmitter: EventEmitter<any> = new EventEmitter();
   @Input() isRanking: boolean = false;


   antiguedadSeleccionada = "TODOS"

   antiguedadGroup: any[] = [{
      nombre: "TODOS",
      descripcion: "",
      array: [null, null]
   }, {
      nombre: "JUNIOR",
      descripcion: "0 a 5 años",
      array: [0, 5]
   }, {
      nombre: "INTERMEDIATE",
      descripcion: "6 a 10 años",
      array: [6, 10]
   }, {
      nombre: "ADVANCED",
      descripcion: "11 a 15 años",
      array: [11, 15]
   }, {
      nombre: "SENIOR",
      descripcion: "más de 15 años",
      array: [16, 50]
   }]

   locations: IOption[] = [{
      value: "0",
      label: 'Cualquier distancia'
   }, {
      //       value: "1",
      //       label: 'Desde mi posición'
      //    }, {
      value: "3",
      label: 'Por provincia'
   }, {
      value: "4",
      label: 'Por comunidad autónoma'
   }]

   someKeyboardConfig: any = {
      connect: true,
      start: [400, 500],
      step: 10,
      tooltips: ['test', '2'],
      range: {
         min: 360,
         max: 1080
      },
      behaviour: 'drag',
   };
   uislider_config: any = {
      behaviour: 'drag',
      connect: true,
      limit: 300, // NOTE: overwritten by [limit]="10"
      range: {
         min: 1,
         max: 300
      },
      pips: {
         mode: 'steps',
         density: 1
      }
   }
   constructor(
      private provinciasService: ProvinciasService,
      private comunidadesService: ComunidadesService,
      private zohoService: ZohoService,
      private derechosService: RightService,
      private route: ActivatedRoute,
      private router: Router,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private sharedUserService: SharedUserService
   ) { }
   ngOnChanges() {
      if (this.filtersFromUrl) {
         if (!this.derechos) { this.loadDerechos(); }
         else { this.setFiltersFromUrl(); }
      }
   }
   ngOnInit() {
      this.isGeoEnabled = this.isUbicacionEnabled();
      this.fetchProvincias();
      this.fetchComunidades();
      this.loadMaterias();
      $(function () {
         $('[data-toggle="tooltip"]').tooltip()
      })
   }
   loadDerechos() {
      if (!this.derechos) this.derechosService
         .findDerechos()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(derechos => {
            this.derechos = this.cloneOptionsRights(derechos);
            this.derechosOriginales = derechos;
            this.derechosOnly = derechos;
            this.setFiltersFromUrl();
         }, err => {
            this.dispayToast(err)
         });
   }
   setFiltersFromUrl() {
      this.provincia = this.filtersFromUrl.provincia;
      this.comunidad = this.filtersFromUrl.comunidad;
      this.consultas = parseInt(this.filtersFromUrl.consultas) || 0;
      this.telefono = parseInt(this.filtersFromUrl.telefono) || 0;
      if (this.provincia) this.filterQueryParams.provincia = this.provincia;
      if (this.comunidad) this.filterQueryParams.comunidad = this.comunidad;
      this.filterQueryParams.consultas = this.consultas;
      this.filterQueryParams.telefono = this.telefono;
      if (this.filtersFromUrl.antiguedad_lower) {
         this.filterQueryParams.antiguedad_lower = this.filtersFromUrl.antiguedad_lower;
      }
      if (this.filtersFromUrl.antiguedad_upper) {
         this.filterQueryParams.antiguedad_upper = this.filtersFromUrl.antiguedad_upper;
      }
      if (this.filtersFromUrl.antiguedad_lower > -1 && this.filtersFromUrl.antiguedad_upper > -1) {
         const antiguedad = this.antiguedadGroup.find(antiguedad => antiguedad.array[0] == this.filtersFromUrl.antiguedad_lower
            && antiguedad.array[1] == this.filtersFromUrl.antiguedad_upper);
         if (antiguedad)
            this.changeAntiguedad(antiguedad.nombre);
      }
      this.ubicationOptionFilter = this.getUbicationOption(this.filtersFromUrl);
      this.setFiltersRight(this.derechos);
   }
   setFiltersRight(derechos: any[]) {
      this.materiaBuscada = '';
      this.nombreMateriaUrl = '';
      if (this.filtersFromUrl.right || this.filtersFromUrl.materia) {
         this.nombreDerechoUrl = this.filtersFromUrl.right;
         this.nombreMateriaUrl = this.filtersFromUrl.materia;
         if (this.nombreMateriaUrl) {
            this.derechoBuscado = this.parseDerechoMateria(this.nombreDerechoUrl);
            this.terminoBuscado = this.derechoBuscado + ' (' + this.parseDerechoMateria(this.nombreMateriaUrl) + ')';
            this.materiaBuscada = this.parseDerechoMateria(this.nombreMateriaUrl);
            this.onFilterInputChanged(this.parseDerechoMateria(this.nombreMateriaUrl));
         } else {
            if (!this.isRightUrlValid(this.derechosOnly, this.nombreDerechoUrl)) {
               this.router.navigate(["/404"]);
            }
            this.terminoBuscado = this.parseDerechoUrl(this.nombreDerechoUrl, derechos);
            this.derechoBuscado = this.terminoBuscado;
            this.materiaBuscada = undefined;
         }
      }
      this.onFilterApplied();
   }
   loadMaterias() {
      this.derechosService
         .searchMateriasYDerechos(this.inputChange)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(derechos => {
            this.derechosOriginales = [...derechos];
            this.derechos = this.cloneMateriasOptionsRights(derechos);
         }, err => {
            this.dispayToast(err)
         });
   }
   onFilterInputChanged(searchTerm: string) {
      if (searchTerm) {
         this.inputChange.next(searchTerm);
      } else {
         this.loadDerechos();
      }
   }
   parseDerechoMateria(derechoMateriaUrl: string): string {
      derechoMateriaUrl = this.sharedUserService.formatStringUrl(derechoMateriaUrl);
      return derechoMateriaUrl.charAt(0).toUpperCase() + derechoMateriaUrl.slice(1);
   }
   parseDerechoUrl(derechoUrl: string, derechos: IOption[]): string {
      for (let i = 0; i < derechos.length; i++) {
         if (this.normalizeString(derechos[i].value.toLocaleLowerCase()) == this.normalizeString(derechoUrl.toLocaleLowerCase())) {
            return derechos[i].value;
         }
      }
      return undefined;
   }
   onDerechoChange($event) {
      if (this.terminoBuscado && this.terminoBuscado.indexOf('(') !== -1 && this.terminoBuscado.indexOf(')') !== -1) {
         let indexim = this.terminoBuscado.indexOf('(');
         let indexfm = this.terminoBuscado.indexOf(')');
         this.derechoBuscado = this.terminoBuscado.substring(0, indexim - 1);
         this.materiaBuscada = this.terminoBuscado.substring(indexim + 1, indexfm);
      } else if (this.terminoBuscado) {
         this.derechoBuscado = this.terminoBuscado;
         this.materiaBuscada = undefined;
      }
      this.onFilterApplied();
   }

   onFilterApplied() {
      const filterParams = { ...this.filterQueryParams, right: this.derechoBuscado, materia: this.materiaBuscada };
      this.filterAppliedEmitter.emit(filterParams);
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
   getUbicationOption(params: any): string {
      if (params.provincia) return "3";
      else if (params.comunidad) return "4";
      // else if (params.distancia) return "1";
      else return undefined
   }
   changeAntiguedad(nombreAntiguedad?: string) {
      nombreAntiguedad = nombreAntiguedad || this.antiguedadSeleccionada;
      const antiguedad = this.antiguedadGroup.find(a => a.nombre === nombreAntiguedad);
      if (!antiguedad) return;
      this.antiguedadSeleccionada = antiguedad.nombre;
      this.filterQueryParams.antiguedad_lower = antiguedad.array[0];
      this.filterQueryParams.antiguedad_upper = antiguedad.array[1];
   }

   onAntiguedadChange(e) {
      this.changeAntiguedad()
      this.onFilterApplied();
   }
   onProvinciaChange($event) {
      this.filterQueryParams.provincia = $event.value;
      this.onFilterApplied();
   }
   onComunidadChange($event) {
      this.filterQueryParams.comunidad = $event.value;
      this.onFilterApplied();
   }
   cleanProvincia() {
      this.provincia = undefined;
      delete this.filterQueryParams.provincia;
      // this.onFilterApplied();
   }
   cleanComunidad() {
      this.comunidad = undefined;
      delete this.filterQueryParams.comunidad;
      // this.onFilterApplied();
   }
   cleanMiPosicion() {
      delete this.filterQueryParams.distancia;
      delete this.filterQueryParams.location;
      // this.onFilterApplied();
   }
   onConsultaChange(){
      if(this.consultas == 0) this.consultas = 1;
      else this.consultas = 0;
      this.filterQueryParams.consultas = this.consultas;
      this.onFilterApplied();
   }
   onTlfChange(){
      if(this.telefono == 0) this.telefono = 1;
      else this.telefono = 0;
      this.filterQueryParams.telefono = this.telefono;
      this.onFilterApplied();
   }
   //    onDistanciaChange() {
   //       this.filterQueryParams.distancia = this.location.distanceDesired;
   //       this.onFilterApplied();
   //    }
   onUbicationChange() {
      if (this.ubicationOptionFilter == "1" && !this.isGeoEnabled) {
         $('#modal-activar-localizacion').modal('show');
      }
      if (this.ubicationOptionFilter != "3") this.cleanProvincia();
      if (this.ubicationOptionFilter != "4") this.cleanComunidad();
      if (this.ubicationOptionFilter != "1") this.cleanMiPosicion();
      if (this.ubicationOptionFilter == "1") {
         // this.cleanCp();
         this.getLocation("1");
         //    this.onDistanciaChange();
         // } else if (this.ubicationOptionFilter == "2") {
         //    this.onDistanciaChange();
      } else {
         // this.cleanCp();
         //    this.filterQueryParams.distancia = null;
         //this.applyFilter();
      }
      if (this.ubicationOptionFilter === '0') {
         this.onFilterApplied();
      }
   }

   dispayToast(err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.msg = err;
      this.toastyService.error(toast);
   }

   fetchProvincias() {
      this.provincias = this.provinciasService.getProvincias().map(
         option => { return { value: option.text, label: option.text } }
      );
   }

   fetchComunidades() {
      this.comunidades = this.comunidadesService.getComunidades().map(
         option => {
            return { value: option.text, label: option.text }
         }
      );
   }

   isUbicacionEnabled = (): boolean => {
      let u = localStorage.getItem('isUbicationEnabled');
      if (u) return (u == 'true');
      else return false;
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
   normalizeString(texto: string) {
      return texto.split('').map(function (letter) {
         let i = this.accents.indexOf(letter)
         return (i !== -1) ? this.out[i] : letter
      }.bind({
         accents: 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź',
         out: 'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz'
      })
      ).join('')
   }
   getLocation = async (opcion: string): Promise<any> => {
      return new Promise((resolve, reject) => {
         if (!this.wasCalledGeo) {
            this.wasCalledGeo = true;
            navigator.geolocation.getCurrentPosition(position => {
               this.location.lat = position.coords.latitude;
               this.location.lon = position.coords.longitude;
               if (opcion) this.ubicationOptionFilter = opcion;
               this.isGeoEnabled = true;
               localStorage.setItem('isUbicationEnabled', "true");
               this.filterQueryParams.location = this.location;
               resolve();
            }, err => {
               this.location.lat = undefined;
               this.location.lon = undefined;
               this.ubicationOptionFilter = "0";
               this.isGeoEnabled = false;
               localStorage.setItem('isUbicationEnabled', "false");
               resolve();
            });
         } else {
            if (!(opcion == "1" && !this.isGeoEnabled)) this.ubicationOptionFilter = opcion;
            else this.ubicationOptionFilter = "0";
            resolve();
         }
      });
   }
   onAyudaDerecho() {
      this.zohoService.ayudaAreaDerecho();
   }



}
