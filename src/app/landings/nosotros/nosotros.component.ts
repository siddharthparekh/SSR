import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { Meta, Title } from '@angular/platform-browser';

@Component({
   selector: 'app-nosotros',
   templateUrl: './nosotros.component.html',
   styleUrls: ['./nosotros.component.css'],
})
export class NosotrosComponent implements OnInit, OnDestroy {

   email: string;
   nombre: string;
   asunto: string;
   texto: string;
   privacidad: string;
   noticias: string;
   s: any;
   errorMsg: string;
   reqInProg: boolean;

   constructor(
      private userService: UserService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private meta: Meta,
      private title: Title
   ) { }

   ngOnInit() {
      this.setMetas();
   }
   ngOnDestroy() {
      this.unsetMetas();
   }

   setMetas() {
      this.meta.removeTag("name='robots'");
      this.title.setTitle("Equipo & Misión | Emérita Legal");
      this.meta.addTag({
         name: "description", content: "Promovemos la transparencia y la accesibilidad universal a información de interés público en el ámbito de la justicia."
      });
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.meta.removeTag("name='description'");
   }

   send = (): void => {
      this.reqInProg = true;
      this.s = this.userService
         .contact({
            email: this.email,
            asunto: this.asunto,
            texto: this.texto,
            nombre: this.nombre,
            privacidad: this.privacidad,
            noticias: this.noticias
         })
         .subscribe(
            res => {
               this.reqInProg = false;
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.title = "OK";
               toast.msg = "Enviado con éxito";
               this.toastyService.success(toast);
            },
            err => {
               this.reqInProg = false;
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.msg = err;
               this.toastyService.error(toast);
            }
         );
   };

   download() {
      window.open("/nosotros/kitprensa", "_blank");
   }

}
