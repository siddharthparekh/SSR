import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { BlockingModule } from '../../blocking/blocking.module';
import { ErrorModule } from '../../error/error.module';
import { IrjIndicatorModule } from '../../irj-indicator/irj-indicator.module';
import { LoadingModule } from '../../../shared/components-utils/loading/loading.module';
import { SpecsModule } from './specs/specs.module';
import { StatsChartsModule } from './charts/stats-charts.module';
import { StatsComponent } from './stats.component';
import { LawAreasComponent } from './law-areas/law-areas.component';
import { ClientsComponent } from './clients/clients.component';
import { GlobalEvolutionComponent } from './global-evolution/global-evolution.component';
import { StatsService } from './stats.service';
import { MapStatsComponent } from './map-stats/map-stats.component';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    BlockingModule,
    ErrorModule,
    IrjIndicatorModule,
    LoadingModule,
    SpecsModule,
    StatsChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmaps_apikey
    }),
  ],
  declarations: [
    StatsComponent,
    LawAreasComponent,
    ClientsComponent,
    GlobalEvolutionComponent,
    MapStatsComponent,
  ],
  exports: [
    StatsComponent,
  ],
  providers: [
    StatsService,
  ],
})
export class StatsModule {}
