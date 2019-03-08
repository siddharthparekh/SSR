import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalContactoComponent } from './modal-contacto/modal-contacto.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from '../../shared/components-utils/loading/loading.module';


@NgModule({
   imports: [
      CommonModule,
      RecaptchaModule.forRoot(),
      SharedModule,
      FormsModule,
      LoadingModule
   ],
   declarations: [
      ModalContactoComponent
   ],
   exports: [
      ModalContactoComponent
   ]
})
export class ModalProfileModule { }
