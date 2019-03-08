import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpGuard } from './../_guard/signup_guard';
import { LoginGuard } from './../_guard/login_guard';

import { SignupComponent } from './signup/signup-profesional/signup.component';
import { RecoverPasswordComponent } from './recover-password/recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password-parent/reset-password/reset-password.component';
import { RegisterCustomerComponent } from './signup/register-customer/register-customer.component';

const autorizacionRoutes: Routes = [
]

@NgModule({
  imports: [
    RouterModule.forChild(autorizacionRoutes)
  ]
})
export class AutorizacionRoutingModule { }
