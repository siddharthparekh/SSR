import { Top } from './../../_models/Top';
import { Component, OnInit, ElementRef } from '@angular/core';
import { RankingComponent } from '../../busquedas/ranking/ranking.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ZohoService } from '../../_services/zoho.service';
import { RightService } from "./../../_services/right.service";
import { ProfesionalService } from "../../_services/profesional.service";
import { ProvinciasService } from "../../_services/provincias.service";
import { ComunidadesService } from "./../../_services/comunidades.service";
import { Subject } from "rxjs";
import { map, takeUntil, tap, filter } from "rxjs/operators";
import { IOption, SelectComponent } from "ng-select";
import { ToastOptions, ToastyConfig, ToastyService } from "ng2-toasty";
import { SharedUserService } from "./../../_services/shared-user.service";
import { IDerecho } from "./../../_models/Derecho";
import { derechos } from './especialidades-texts';
import { UtilFunctions } from './../../_utils/utilFunctions';
@Component({
   selector: 'app-especialidades',
   templateUrl: './especialidades.component.html',
   styleUrls: ['./especialidades.component.css'],
   providers: [
      ZohoService,
      RightService,
      ProvinciasService,
      ComunidadesService,],
})
export class EspecialidadesComponent implements OnInit {

   derecho: string = "seguros";
   provincia: string = "";
   comunidad: string = "";
   selectedPlace: string = "";
   materias: string[];
   derechoContent: string;
   materiasColumnLeft: string[];
   materiasColumnRight: string[];
   derechoTitle: string = "Seguros";

   provincias: IOption[];
   comunidades: IOption[];
   derechos: Array<IOption>;

   ngUnsubscribe = new Subject<void>();
   whiteListDerechos = [
      'derecho-colectivo-del-trabajo',
      'derecho-de-la-seguridad-social',
      'derecho-del-trabajo',
      'derecho-de-la-funcion-publica',
      'derecho-de-familia',
      'derecho-penal-de-familia',
      'derecho-sucesorio',
      'derecho-militar'
   ]

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private zohoService: ZohoService,
      private derechosService: RightService,
      private provinciasService: ProvinciasService,
      private comunidadesService: ComunidadesService,
      private sharedUserService: SharedUserService,
   ) { }

   ngOnInit() {

      this.derechosService
         .findDerechos()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(derechos => {
            this.derechos = this.cloneOptionsRights(derechos);
            this.handleInputParams(derechos);
         }, err => {
            this.handleInputParams([]);
         });
      this.fetchProvincias();
      this.fetchComunidades();

   }

   handleInputParams(derechos) {

      let provincia: string = this.route.snapshot.queryParamMap.get('provincia');
      let comunidad: string = this.route.snapshot.queryParamMap.get('comunidad');

      this.derecho = this.route.snapshot.paramMap.get("especialidad");

      if (this.whiteListDerechos.indexOf(this.derecho) < 0) this.router.navigate(['/404']);

      this.fillDerechoContent(this.derecho.replace(/\-/g, ' ').toLowerCase());

      // let derechoFormatted: string = this.derecho.replace(/\-/g, ' ').toLowerCase();
      this.derechoTitle = this.parseDerechoUrl(this.derecho, derechos);

      if (provincia != null) {
         this.provincia = provincia;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.provincia);
      }
      if (comunidad != null) {
         this.comunidad = comunidad;
         this.selectedPlace = UtilFunctions.capitalizeFirstLetter(this.comunidad);
      }

      this.fillMateriasColumns();
   }

   ayuda() {
      this.zohoService.ayudaAreaDerecho();
   }

   fillMateriasColumns() {

      if (this.materias.length == 0) {
         return;
      }

      this.materiasColumnLeft = this.materias.slice(0, Math.ceil(this.materias.length / 2));
      this.materiasColumnRight = this.materias.slice(Math.ceil(this.materias.length / 2));

   }
   fillDerechoContent(derecho: string) {
      let derechoVariable: string = derecho.replace(/ /g, '').toLowerCase();
      this.derechoContent = derechos[derechoVariable].descripcion;
      this.materias = derechos[derechoVariable].materias;
   }

   scroll(el: Element) {
      el.scrollIntoView();
      window.scrollBy(0, -50);
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

   private cloneOptionsRights(options: Array<any>): Array<IOption> {
      return options.map(option => ({
         value: option.nombre,
         label: option.nombre
      }));
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

}