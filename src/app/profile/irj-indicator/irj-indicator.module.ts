import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockingModule } from '../blocking/blocking.module';
import { IrjIndicatorComponent } from './irj-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    BlockingModule,
  ],
  declarations: [
    IrjIndicatorComponent,
  ],
  exports: [
    IrjIndicatorComponent,
  ],
})
export class IrjIndicatorModule {}
