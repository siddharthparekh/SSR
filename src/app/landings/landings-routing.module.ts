import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './../_guard/index_guard';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ModalDerechosComponent } from './landing-page/modals/modal-derechos/modal-derechos.component';
import { LandingProfesionalesComponent } from './landing-profesionales/landing-profesionales.component';
import { BuscadorInternoComponent } from './buscador-interno/buscador-interno.component';

const landingsRoutes: Routes = [
   {
      path: "buscador", component: BuscadorInternoComponent
   }
];


@NgModule({
   imports: [
      RouterModule.forChild(landingsRoutes)
   ]
})
export class LandingsRoutingModule { }
