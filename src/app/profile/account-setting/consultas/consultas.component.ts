import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ICategoria } from './../../../_models/RespuestaLegal';
import { IUsuarioStorage } from './../../../_models/UsuarioStorage';
import { LegalResponseService } from './../../../_services/legal-response.service';
import { ProfesionalService } from './../../../_services/profesional.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

@Component({
   selector: "app-ajustes-consultas",
   templateUrl: "./consultas.component.html",
   styleUrls: ["./consultas.component.css"],
   providers: [ProfesionalService, LegalResponseService]
})
export class AjustesConsultasComponent implements OnInit {
   categorias: ICategoria[];
   reqInProg = false;
   user: IUsuarioStorage;
   ngUnsubscribe = new Subject<void>();
   formulario = {} as any;
   checked: any;
   isEnabledEstadoConsultas: boolean;
   @Input() onUpdatePreciosConsultas: Observable<void>;
   @Output() updatePreciosFinishEmitter: EventEmitter<any> = new EventEmitter<any>();
   isPricesValid = true;
   editing = false;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private sharedUserService: SharedUserService,
      private legalResponseService: LegalResponseService,
      private profesionalService: ProfesionalService
   ) {
      this.toastyConfig.theme = "default";
      this.createForm(this.sharedUserService.getUser());
   }

   ngOnInit() {
      this.user = this.sharedUserService.getUser();
      this.fetchPreciosRespuestas(this.user.tipo);
      this.fetchNombresCategorias();
      if (this.onUpdatePreciosConsultas) {
         this.onUpdatePreciosConsultas
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.updatePrecios());
      }
   }
   createForm(usuario: IUsuarioStorage) {
      this.checked = usuario.consultas;
      this.formulario = {
         simple: "",
         normal: "",
         compleja: ""
      };
   }
   fetchNombresCategorias() {
      this.legalResponseService
         .getCategorias()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(categorias => {
            this.categorias = categorias.map(c => {
               c.nombre = c.nombre.replace("_", " ");
               return c;
            });
         });
   }
   fetchPreciosRespuestas(userType: number) {
      if (userType != 1)
         this.legalResponseService
            .getCategoriasRespuestasProf(null, null)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               res => {
                  if (res && res.length > 0) {
                     this.formulario.simple = res[0].precio;
                     this.formulario.normal = res[1].precio;
                     this.formulario.compleja = res[2].precio;
                     this.isEnabledEstadoConsultas = true;
                  }
               },
               err => {
                  this.reqInProg = false;
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
               }
            );
   }

   checkChange() {
      this.reqInProg = true;
      this.profesionalService
         .updateEstadoConsultas()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (estanConsultasActivas: boolean) => {
               this.reqInProg = false;
               this.checked = estanConsultasActivas;
               this.sharedUserService.updateConsultasStatus(estanConsultasActivas);
            },
            err => {
               this.reqInProg = false;
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.msg = err;
               this.toastyService.error(toast);
            }
         );
   }

   updatePrecios(value = true) {
      this.reqInProg = value;
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      var backendFormulario = Object.assign({}, this.formulario);
      backendFormulario.categoriasRespuesta = [
         {
            id: this.categorias[0].id,
            precio: this.formulario.simple
         },
         {
            id: this.categorias[1].id,
            precio: this.formulario.normal
         },
         {
            id: this.categorias[2].id,
            precio: this.formulario.compleja
         }
      ];
      this.profesionalService
         .updatePreciosConsultas(backendFormulario)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (esCreacionPrecios: boolean) => {
               this.updatePreciosFinishEmitter.emit();
               this.reqInProg = false;
               this.editing = false;
               console.log(this.formulario);
               if (esCreacionPrecios) {
                  this.isEnabledEstadoConsultas = true;
                  this.checked = true;
                  this.sharedUserService.updateConsultasStatus(true);
               }
            },
            err => {
               this.updatePreciosFinishEmitter.emit(err);
               this.reqInProg = false;
               this.editing = false;
            }
         );
   }
}
