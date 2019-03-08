import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockingSimpleComponent } from './simple/blocking-simple.component';
import { BlockingComplexComponent } from './complex/blocking-complex.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BlockingComplexComponent,
    BlockingSimpleComponent,
  ],
  exports: [
    BlockingComplexComponent,
    BlockingSimpleComponent,
  ],
})
export class BlockingModule {}
