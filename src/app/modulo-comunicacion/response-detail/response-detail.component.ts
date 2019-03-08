import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LegalResponseService } from './../../_services/legal-response.service';
import { IRespuestaLegal, EstadoRespuesta } from './../../_models/RespuestaLegal';
import { IUsuario } from './../../_models/Usuario';
import { IMensaje } from './../../_models/Mensaje';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import * as FileSaver from 'file-saver';
import { SharedUserService } from './../../_services/shared-user.service';
import { Subject } from 'rxjs';

declare var $: any;

interface IRate {
   atencion: number,
   asesoramiento: number,
   calidad: number
};

@Component({
   selector: 'app-response-detail',
   templateUrl: './response-detail.component.html',
   styleUrls: ['./response-detail.component.css']
})
export class ResponseDetailComponent implements OnInit {

   response: IRespuestaLegal;
   wasOpinionShowed: boolean = true;
   isClient: boolean = false;
   client: IUsuario;
   aclaracion: IMensaje[];
   ngUnsubscribe: Subject<void> = new Subject<void>();
   txt: string;
   showBar = true;
   rate: IRate = {
      atencion: -1,
      asesoramiento: -1,
      calidad: -1,
   };
   comentario: string;

   constructor(private responseService: LegalResponseService,
      private route: ActivatedRoute,
      private router: Router,
      private sharedUserService: SharedUserService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig, ) {
      this.toastyConfig.theme = "default";
   }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.responseService.getLegalResponse(params['responseId']).pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
               this.response = response;
               console.log(response)
               this.isClient = this.response.Mensaje.Remitente.id != this.sharedUserService.getUserId();
               if (!this.isClient) {
                  this.client = this.response.Mensaje.Conversacion.Usuarios.find(u => u.id != this.sharedUserService.getUserId());
               }
               this.responseService.getAclaracion(this.response.id).pipe(
                  takeUntil(this.ngUnsubscribe))
                  .subscribe(aclaracion => {
                     this.aclaracion = aclaracion;
                  }, err => {
                     var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                     toast.msg = err;
                     this.toastyService.error(toast);
                  })
               if (response.estado !== 'ENVIADA') this.responseService.getValoracion(this.response.id).pipe(
                  takeUntil(this.ngUnsubscribe))
                  .subscribe(valoracion => {
                     this.wasOpinionShowed = valoracion ? (Object.keys(valoracion).length ? true : false) : false;
                  }, err => {
                  });
            }, err => {
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.msg = err;
               this.toastyService.error(toast);
            });
      });
   }

   sendRating() {
      this.responseService.rateLawyerWithResponse(this.response.id,
         { rating: this.rate, opinion: this.comentario }
      ).pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(() => {
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = 'Gracias por su valoración';
            toast.title = "Valoración exitosa";
            this.toastyService.success(toast);
            this.wasOpinionShowed = true;
         }, err => {
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "Error";
            toast.msg = 'No se pudo valorar el abogado';
            this.toastyService.error(toast);
         })
   }
   descargarPresupuesto() {
      this.responseService.downloadBudget(this.response.id).pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(data => {
            let filename = data.headers.get('Content-disposition');
            if (!filename) return;
            filename = filename.split('"')[1];
            FileSaver.saveAs(data.body, filename);
         }, err => {
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "Error"
            toast.msg = 'No se pudo descargar el archivo';
            this.toastyService.error(toast);
         })
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
   goProfile() {
      this.router.navigate(this.sharedUserService.getProfileUrl(this.response.Mensaje.Remitente, false));
   }

   updateRate(name, rate) {
      this.rate[name] = rate;
   }

}
function capitalize(value: any) {
   if (value) {
      value = value.toLowerCase();
      var res = "";
      var arr = value.split(" ");
      for (let i of arr) {
         res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
      }
      return res;
   }
   return '';
}
