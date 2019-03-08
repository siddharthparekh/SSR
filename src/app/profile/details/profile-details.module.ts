import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { ProfileDetailsComponent } from './profile-details.component';
import { ProfileNavComponent } from './nav/profile-nav.component';
import { TariffsComponent } from './tariffs/tariffs.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackModule } from './feedback/feedback.module';
import { StatsModule } from './stats/stats.module';
import { AboutModule } from './about/about.module';
import { BlockingModule } from '../blocking/blocking.module';
import { LoadingModule } from '../../shared/components-utils/loading/loading.module';
import { ContactService } from './contact/contact.service';
import { ErrorModule } from '../error/error.module';
import { TariffsService } from './tariffs/tariffs.service';
import { environment } from '../../../environments/environment';
import { ProfileEmitterService } from '../../_services/profile-emitter.service';
import { SharedLinkModule } from '../../shared/components-utils/shared-link/shared-link.module';

@NgModule({
  imports: [
    CommonModule,
    AboutModule,
    FeedbackModule,
    StatsModule,
    BlockingModule,
    ErrorModule,
    LoadingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmaps_apikey
    }),
    SharedLinkModule
  ],
  declarations: [
    ProfileDetailsComponent,
    ProfileNavComponent,
    ContactComponent,
    TariffsComponent,
  ],
  exports: [
    ProfileDetailsComponent,
  ],
  providers: [
    GoogleMapsAPIWrapper,
    ContactService,
    TariffsService,
    ProfileEmitterService
  ],
})
export class ProfileDetailsModule { }
