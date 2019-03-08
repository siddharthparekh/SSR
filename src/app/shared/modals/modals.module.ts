import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContractPlansComponent } from './profile-contract-plans/profile-contract-plans.component';
import { EspecialistContractPlansComponent } from './specialist-contract-plans/specialist-contract-plans.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProfileContractPlansComponent,
    EspecialistContractPlansComponent
  ],
  exports: [
    ProfileContractPlansComponent,
    EspecialistContractPlansComponent
  ]
})
export class ModalsModule { }
