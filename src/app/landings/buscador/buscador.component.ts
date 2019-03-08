import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import {
   BuscadorLista,
   BuscadorListaLanding,
   DERECHO_MATERIA,
   IBuscadorListaLanding,
   BuscadorListaEspecialidad
} from "../../_models/BuscadorListaLanding";
import { RightService } from "../../_services/right.service";
import { SharedUserService } from "../../_services/shared-user.service";
import { EmitterService } from "../emitter/emitter.service";
import { ZohoService } from './../../_services/zoho.service';

@Component({
   selector: "app-buscador",
   templateUrl: "./buscador.component.html",
   styleUrls: ["./buscador.component.css"],
   providers: [RightService, ZohoService]
})
export class BuscadorComponent implements OnInit, OnDestroy {
   reqInProg = false;
   showResults = false;
   currentTerm: string;
   searchTerm$ = new Subject<string>();
   searchResult: IBuscadorListaLanding = new BuscadorListaLanding({
      abogado: "Abogados",
      despacho: "Despachos",
      especialidad: "Especialidades",
      abogados: [],
      depachos: [],
      Especialidades: []
   });
   private timer: any;
   private subscription: any[] = [];

   constructor(
      private sharedUserService: SharedUserService,
      private router: Router,
      private rightService: RightService,
      private emitterService: EmitterService,
      private zohoService: ZohoService
   ) { }

   ngOnInit() {
      this.setListeners();
   }

   ngOnDestroy() {
      this.subscription.forEach(val => val.unsubscribe());
   }

   onAyudaDerecho() {
      this.zohoService.ayudaAreaDerecho();
   }

   closeSearch() {
      this.reqInProg = false;
      this.showResults = false;
   }

   clickedSearch() {
      this.searchTerm$.next(this.currentTerm);
   }

   setListeners() {
      // Abogado clicked
      this.subscription.push(
         this.emitterService.abogadoClicked$.subscribe(abogado => {
            const urlAbogado = this.sharedUserService.getProfileUrl(null, false,
               { userName: abogado.texto, userId: abogado.id }
            )
            this.router.navigate(urlAbogado);
         })
      );

      // Despacho clicked
      this.subscription.push(
         this.emitterService.despachoClicked$.subscribe(despacho => {
            console.log(despacho);
         })
      );

      // Especialidad clicked
      this.subscription.push(
         this.emitterService.especialidadClicked$.subscribe(specialidad => {
            let url = ['directorio'];
            const derechoUrlFormat = this.sharedUserService.formatUrlString(specialidad.derecho);
            url.push(derechoUrlFormat)
            if (specialidad.tipo == "MATERIA") {
               const materiaUrlFormat = this.sharedUserService.formatUrlString(specialidad.materia);
               url.push(materiaUrlFormat);
            }
            this.router.navigate(url);
         })
      );

      this.subscription.push(
         this.searchTerm$
            .pipe(
               debounceTime(400),
               distinctUntilChanged(),
               switchMap(term => {
                  this.reqInProg = true;
                  this.showResults = true;
                  this.currentTerm = term;
                  return this.rightService.searchCombined(term);
               })
            )
            .subscribe(
               res => {
                  // setting Abogados
                  this.searchResult.abogados = res.profesionales.map(p => {
                     return new BuscadorLista({
                        foto:
                           p.foto && p.foto.length > 0
                              ? p.foto
                              : "/assets/images/avatars/user-pic-placeholder-abogado.svg",
                        texto: p.nombre,
                        esExperto: false,
                        id: p.id
                     });
                  });
                  // setting Despachos
                  this.searchResult.despachos = res.despachos.map(d => {
                     return new BuscadorLista({
                        foto:
                           d.foto && d.foto.length > 0
                              ? d.foto
                              : "/assets/images/avatars/user-pic-placeholder-despacho.svg",
                        texto: d.nombre,
                        esExperto: false
                     });
                  });
                  // setting Especiliadades
                  this.searchResult.especialidades = res.derechos.map(e => {
                     return new BuscadorListaEspecialidad({
                        texto:
                           e.derecho +
                           (DERECHO_MATERIA === e.tipo ? ` (${e.derechoConcreto})` : ""),
                        derechoConcreto: e.derechoConcreto,
                        derecho: e.derecho,
                        tipo: e.tipo
                     });
                  });

                  this.reqInProg = false;
               },
               err => {
                  console.log(err);
                  this.reqInProg = false;
                  this.searchResult.abogados = [];
                  this.searchResult.despachos = [];
                  this.searchResult.especialidades = [];
               }
            )
      );
   }
}
