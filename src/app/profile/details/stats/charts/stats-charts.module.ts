import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsDonutComponent } from './clients-donut/clients-donut.component';
import { SuccessRateDonutComponent } from './success-rate-donut/success-rate-donut.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { CompareBarsComponent } from './compare-bars/compare-bars.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClientsDonutComponent,
    SuccessRateDonutComponent,
    HorizontalBarComponent,
    CompareBarsComponent,
  ],
  exports: [
    ClientsDonutComponent,
    SuccessRateDonutComponent,
    HorizontalBarComponent,
    CompareBarsComponent,
  ],
})
export class StatsChartsModule {}
