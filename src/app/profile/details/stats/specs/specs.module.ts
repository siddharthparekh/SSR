import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockingModule } from '../../../blocking/blocking.module';
import { ErrorModule } from '../../../error/error.module';
import { LoadingModule } from '../../../../shared/components-utils/loading/loading.module';
import { StatsChartsModule } from '../charts/stats-charts.module';
import { SpecComponent } from './spec.component';
import { SpecHeaderComponent } from './header/spec-header.component';
import { SpecContentComponent } from './content/spec-content.component';
import { SpecRankingComponent } from './content/ranking/spec-ranking.component';
import { LaurelComponent } from './content/ranking/laurel/laurel.component';
import { SubjectsComponent } from './content/subjects/subjects.component';
import { CasesComponent } from './content/cases/cases.component';
import { ClientsComponent } from './content/clients/clients.component';
import { EvolutionCasesComponent } from './content/evolution-cases/evolution-cases.component';
import { ResultsComponent } from './content/results/results.component';
import { SuccessRateComponent } from './content/success-rate/success-rate.component';
import { SpecService } from './spec.service';
import { SpecLineChartComponent } from './content/line-chart/line-chart.component';
import { IrjIndicatorModule } from '../../../irj-indicator/irj-indicator.module';

@NgModule({
   imports: [
      CommonModule,
      BlockingModule,
      ErrorModule,
      LoadingModule,
      StatsChartsModule,
      IrjIndicatorModule
   ],
   declarations: [
      SpecComponent,
      SpecHeaderComponent,
      SpecContentComponent,
      SpecRankingComponent,
      LaurelComponent,
      SubjectsComponent,
      CasesComponent,
      ClientsComponent,
      EvolutionCasesComponent,
      ResultsComponent,
      SuccessRateComponent,
      SpecLineChartComponent
   ],
   exports: [
      SpecComponent,
   ],
   providers: [
      SpecService,
   ],
})
export class SpecsModule { }
