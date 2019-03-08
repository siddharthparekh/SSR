import { SearchComponent } from './../busquedas/directorio/search.component';
import { NgModule } from '@angular/core'
import { LandingsRoutingModule } from './landings-routing.module'
import { SharedModule } from './../shared/shared.module'
import { LandingPageComponent } from './landing-page/landing-page.component'
import { ModalDerechosComponent } from './landing-page/modals/modal-derechos/modal-derechos.component'
import { LandingProfesionalesComponent } from './landing-profesionales/landing-profesionales.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ModalPeticionProfesionalComponent } from './modals/modal-peticion-profesional/modal-peticion-profesional.component'
import { BuscadorComponent } from './buscador/buscador.component'
import { BuscadorListaResultadoComponent } from './buscador/buscador-lista-resultado/buscador-lista-resultado.component'
import { BuscadorListaComponent } from './buscador/buscador-lista/buscador-lista.component'
import { HeroComponent } from './landing-page/hero/hero.component'
import { FeaturesComponent } from './landing-page/features/features.component'
import { ExpertsComponent } from './landing-page/experts/experts.component'
import { QualityDataComponent } from './landing-page/quality-data/quality-data.component'
import { AboutUsComponent } from './landing-page/about-us/about-us.component'
import { EmitterService } from './emitter/emitter.service';
import { MetodologiaComponent } from './metodologia/metodologia.component'
import { LandingSoyabogadoComponent } from './landing-soyabogado/landing-soyabogado.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { LandingSoybogadoEmeritaComponent } from './landing-soybogado-emerita/landing-soybogado-emerita.component';
import { LoadingModule } from '../shared/components-utils/loading/loading.module';
import { BuscadorInternoComponent } from './buscador-interno/buscador-interno.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { SearchModule } from "../busquedas/search.module";
import { ModalsModule } from '../shared/modals/modals.module';
import { DownloadKitComponent } from './download-kit/download-kit.component';
declare var $: any

@NgModule({
   declarations: [
      LandingPageComponent,
      ModalDerechosComponent,
      LandingProfesionalesComponent,
      ModalPeticionProfesionalComponent,
      BuscadorComponent,
      BuscadorListaResultadoComponent,
      BuscadorListaComponent,
      HeroComponent,
      FeaturesComponent,
      ExpertsComponent,
      QualityDataComponent,
      AboutUsComponent,
      MetodologiaComponent,
      LandingSoyabogadoComponent,
      NosotrosComponent,
      LandingSoybogadoEmeritaComponent,
      BuscadorInternoComponent,
      EspecialidadesComponent,
      DownloadKitComponent,
   ],
   imports: [
      SharedModule,
      LoadingModule,
      LandingsRoutingModule,
      SearchModule,
      ModalsModule
   ],
   providers: [EmitterService],
})
export class LandingsModule { }
