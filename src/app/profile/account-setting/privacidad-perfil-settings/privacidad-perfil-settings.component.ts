import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedUserService } from '../../../_services/shared-user.service';
import { ProfesionalService } from '../../../_services/profesional.service';
import { Subscription } from 'rxjs';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';

@Component({
   selector: 'app-privacidad-perfil-settings',
   templateUrl: './privacidad-perfil-settings.component.html',
   styleUrls: ['./privacidad-perfil-settings.component.css']
})
export class PrivacidadPerfilSettingsComponent implements OnInit, OnDestroy {

   opcionesPrivacidad = [{
      label: "Público",
      value: 2,
      textDescription: "Perfil profesional visible en el directorio y a través del buscador interno de uso exclusivo para profesionales."
   },
   {
      label: "Privado",
      value: 1,
      textDescription: "Perfil profesional visible únicamente a través del buscador interno de uso exclusivo para profesionales."
   },
   {
      label: "Oculto",
      value: 0,
      textDescription: "El perfil profesional se mantiene oculto."
   }];
   opcionSeleccionada: number;
   opcionSeleccionadaInicial: number;
   reqInProg = false;
   editing = false;
   s: Subscription;

   constructor(
      private sharedUserService: SharedUserService,
      private profesionalService: ProfesionalService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
   ) { }

   ngOnInit() {
      const user = this.sharedUserService.getUser();
      // if (user.Estadisticas.tipo == 0) this.opcionesPrivacidad.splice(-1);
      this.opcionSeleccionada = user.visualizacionPerfil;
      this.opcionSeleccionadaInicial = this.opcionSeleccionada;
   }
   updatePrivacy() {
      this.reqInProg = true;
      this.s = this.profesionalService.updateVisualizacionPerfil({ perfil: this.opcionSeleccionada })
         .subscribe(() => {
            this.reqInProg = false;
            this.editing = false;
            let user = this.sharedUserService.getUser();
            user.visualizacionPerfil = this.opcionSeleccionada;
            this.sharedUserService.setUsuario(user);
         }, err => {
            this.opcionSeleccionada = this.opcionSeleccionadaInicial;
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "ERROR";
            toast.msg = err;
            this.toastyService.error(toast);
         });
   }
   ngOnDestroy() {
      if (this.s) this.s.unsubscribe();
   }

}
