import { CondicionesComponent } from "./condiciones/condiciones.component";
import { CondionesProfesionalesComponent } from './condiones-profesionales/condiones-profesionales.component';
import { CookiesComponent } from './cookies/cookies.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PrivacyClientsComponent } from './privacy/sub-contenido/privacy-clients.component';
import { PrivacyContactosWebComponent } from './privacy/sub-contenido/privacy-contactos-web.component';
import { PrivacyProvedoresComponent } from './privacy/sub-contenido/privacy-provedores.component';
import { PrivacyRecursosComponent } from './privacy/sub-contenido/privacy-recursos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { PrivacyProfesionalPersonasFisicasComponent } from './privacy/sub-contenido/privacy-profesionales-personas-fisicas';


@NgModule({
   declarations: [
      CondicionesComponent,
      CondionesProfesionalesComponent,
      CookiesComponent,
      PrivacyComponent,
      PrivacyClientsComponent,
      PrivacyContactosWebComponent,
      PrivacyProvedoresComponent,
      PrivacyRecursosComponent,
      AvisoLegalComponent,
      PrivacyProfesionalPersonasFisicasComponent
   ],
   imports: [
      CommonModule,
      SharedModule
   ]
})
export class InfoModule { }
