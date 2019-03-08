import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SharedModule } from './../shared/shared.module'
import { CommonModule } from '@angular/common'
import { AutorizacionRoutingModule } from './autorizacion-routing.module'
import { SignupComponent } from './signup/signup-profesional/signup.component'
import { RecoverPasswordComponent } from './recover-password/recover-password/recover-password.component'
import { ResetPasswordComponent } from './reset-password-parent/reset-password/reset-password.component'
import { Angular2SocialLoginModule } from 'angular2-social-login'
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component'
import { RegisterCustomerComponent } from './signup/register-customer/register-customer.component'
import { SignupLawyerBComponent } from './signup/signup-lawyer-b/signup-lawyer-b.component'
import { AuthParentComponent } from './auth-parent/auth-parent.component'
import { AcaPresentacionComponent } from './aca-auth/aca-presentacion.component'
import { AcaSignupComponent } from './aca-auth/aca-signup.component'
import { AcaUpdateCredentialsComponent } from './aca-auth/aca-update-credentials/aca-update-credentials.component'
import { AcaSigninComponent } from './aca-auth/aca-signin.component'
import { CommonLoginComponent } from './login/common-login/common-login.component'
import { RegisterTypeComponent } from './signup/register-type/register-type.component'
import { ReactiveFormsModule } from '@angular/forms'
import { EntrarCertificateBotonComponent } from './botones/entrar-certificate-boton/entrar-certificate-boton.component'
import { EntrarGmailBotonComponent } from './botones/entrar-gmail-boton/entrar-gmail-boton.component';

const providers = {
   google: {
      clientId:
         '353479066305-0v2eqt93dqb4mrqfa4cp6fkqbnsarckc.apps.googleusercontent.com',
   },
   facebook: {
      clientId: '126384494672148',
      apiVersion: 'v2.5',
   },
}

@NgModule({
   imports: [
      SharedModule,
      CommonModule,
      ReactiveFormsModule,
      // AutorizacionRoutingModule
   ],
   declarations: [
      SignupComponent,
      ResetPasswordComponent,
      RecoverPasswordComponent,
      ConfirmAccountComponent,
      RegisterCustomerComponent,
      RegisterCustomerComponent,
      SignupLawyerBComponent,
      AuthParentComponent,
      AcaPresentacionComponent,
      AcaSignupComponent,
      AcaUpdateCredentialsComponent,
      AcaSigninComponent,
      CommonLoginComponent,
      RegisterTypeComponent,
      EntrarCertificateBotonComponent,
      EntrarGmailBotonComponent,
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AutorizacionModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers)
