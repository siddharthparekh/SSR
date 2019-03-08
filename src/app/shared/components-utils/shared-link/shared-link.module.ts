import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLinkComponent } from './shared-link.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SharedLinkComponent
  ],
  exports: [
    SharedLinkComponent,
  ],
})
export class SharedLinkModule { }
