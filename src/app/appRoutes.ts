
import { Routes } from '@angular/router'
import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es'
registerLocaleData(localeEs);
import { LandingSoybogadoEmeritaComponent } from './landings/landing-soybogado-emerita/landing-soybogado-emerita.component';
import { LandingSoyabogadoComponent } from './landings/landing-soyabogado/landing-soyabogado.component';
import { NosotrosComponent } from './landings/nosotros/nosotros.component';
import { AdminGuard } from './_guard/admin_guard';
import { DatosFacturacionGuard } from './_guard/datos_facturacion_guard';
import { IndexGuard } from './_guard/index_guard';
import { LawyerBApproved } from './_guard/lawyer_b_approved';
import { LoggedGuard } from './_guard/logged_guard';
import { LoggedLawyerGuard } from './_guard/logged_lawyer_guard';
import { SignUpGuard } from './_guard/signup_guard';
import { AdminArbolComponent } from './admin/admin-arbol/admin-arbol.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminProfilesComponent } from './admin/admin-profiles/admin-profiles.component';
import { AdminSentenciasComponent } from './admin/admin-sentencias/admin-sentencias.component';
import { AdminUsuariosComponent } from './admin/admin-usuarios/admin-usuarios.component';
import { PanelSentenciasComponent } from './admin/panel-sentencias/panel-sentencias.component';
import { AcaPresentacionComponent } from './autorizacion/aca-auth/aca-presentacion.component';
import { AcaSigninComponent } from './autorizacion/aca-auth/aca-signin.component';
import { AcaSignupComponent } from './autorizacion/aca-auth/aca-signup.component';
import {
   AcaUpdateCredentialsComponent,
} from './autorizacion/aca-auth/aca-update-credentials/aca-update-credentials.component';
import { AuthParentComponent } from './autorizacion/auth-parent/auth-parent.component';
import { ConfirmAccountComponent } from './autorizacion/confirm-account/confirm-account.component';
import { CommonLoginComponent } from './autorizacion/login/common-login/common-login.component';
import { RecoverPasswordComponent } from './autorizacion/recover-password/recover-password/recover-password.component';
import { ResetPasswordComponent } from './autorizacion/reset-password-parent/reset-password/reset-password.component';
import { RegisterCustomerComponent } from './autorizacion/signup/register-customer/register-customer.component';
import { RegisterTypeComponent } from './autorizacion/signup/register-type/register-type.component';
import { SignupComponent } from './autorizacion/signup/signup-profesional/signup.component';
import { SearchComponent } from './busquedas/directorio/search.component';
import { InvoiceCheckoutComponent } from './busquedas/invoice.checkout/invoice.checkout.component';
import { MisAbogadosComponent } from './busquedas/mis-abogados/mis-abogados.component';
import { RankingComponent } from './busquedas/ranking/ranking.component';
import { RankingLandingComponent } from './busquedas/ranking-landing/ranking-landing.component';
import { ShoppingCarComponent } from './busquedas/shopping.car/shopping.car.component';
import { CondicionesComponent } from './info/condiciones/condiciones.component';
import { CondionesProfesionalesComponent } from './info/condiones-profesionales/condiones-profesionales.component';
import { CookiesComponent } from './info/cookies/cookies.component';
import { PrivacyComponent } from './info/privacy/privacy.component';
import { PrivacyClientsComponent } from './info/privacy/sub-contenido/privacy-clients.component';
import { PrivacyContactosWebComponent } from './info/privacy/sub-contenido/privacy-contactos-web.component';
import { PrivacyProvedoresComponent } from './info/privacy/sub-contenido/privacy-provedores.component';
import { PrivacyRecursosComponent } from './info/privacy/sub-contenido/privacy-recursos.component';
import { LandingPageComponent } from './landings/landing-page/landing-page.component';
import { LandingProfesionalesComponent } from './landings/landing-profesionales/landing-profesionales.component';
import { MetodologiaComponent } from './landings/metodologia/metodologia.component';
import { ConversationDefaultComponent } from './modulo-comunicacion/conversation-default/conversation-default.component';
import { ConversationComponent } from './modulo-comunicacion/conversations/conversation/conversation.component';
import { InboxComponent } from './modulo-comunicacion/conversations/inbox/inbox.component';
import { InviteClientComponent } from './modulo-comunicacion/conversations/invite-client/invite-client.component';
import {
   CheckoutResolucionComponent,
} from './modulo-comunicacion/modals/resolucion-respuesta/resolucion-respuesta-aceptar/checkout-resolucion/checkout-resolucion.component';
import {
   CheckoutComponent,
} from './modulo-comunicacion/modals/resolucion-respuesta/resolucion-respuesta-aceptar/checkout/checkout.component';
import {
   ResolucionRespuestaParentComponent,
} from './modulo-comunicacion/modals/resolucion-respuesta/resolucion-respuesta-parent/resolucion-respuesta-parent.component';
import {
   ResolucionRespuestaRechazarComponent,
} from './modulo-comunicacion/modals/resolucion-respuesta/resolucion-respuesta-rechazar/resolucion-respuesta-rechazar.component';
import {
   ModuloComunicacionParentComponent,
} from './modulo-comunicacion/modulo-comunicacion-parent/modulo-comunicacion-parent.component';
import { ResponseDetailComponent } from './modulo-comunicacion/response-detail/response-detail.component';
import { ResponsesComponent } from './modulo-comunicacion/responses/responses.component';
import {
   DatosFacturacionRespuestaLegalComponent,
} from './modulo-comunicacion/respuesta-legal/datos-facturacion-respuesta-legal/datos-facturacion-respuesta-legal.component';
import {
   RespuestaLegalModal1Component,
} from './modulo-comunicacion/respuesta-legal/respuesta-legal-modal-1/respuesta-legal-modal-1.component';
import {
   RespuestaLegalModal2Component,
} from './modulo-comunicacion/respuesta-legal/respuesta-legal-modal-2/respuesta-legal-modal-2.component';
import { AbogadoSettingsComponent } from './profile/abogado-settings/abogado-settings.component';
import { AccountSettingComponent } from './profile/account-setting/account-setting.component';
import { AjustesConsultasComponent } from './profile/account-setting/consultas/consultas.component';
import { TarifasComponent } from './profile/account-setting/tarifas/tarifas.component';
import { BillingInfoComponent } from './profile/billing-info/billing-info.component';
import { ConsultasInfoComponent } from './profile/consultas-info/consultas-info.component';
import { MembershipInfoComponent } from './profile/account-setting/membership-info/membership-info.component';
import { PagosRealizadosComponent } from './profile/pagos-realizados/pagos-realizados.component';
import {
   ModalShowSentenceComponent,
} from './profile/panel-sentencias-aportadas/modals/modal-show-sentence/modal-show-sentence.component';
import {
   PanelSentenciasAportadasComponent,
} from './profile/panel-sentencias-aportadas/panel-sentencias-aportadas.component';
import { PaymentInfoComponent } from './profile/payment-info/payment-info.component';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { ModalExplicacionComponent } from './profile/sidebar/modal-explicacion/modal-explicacion.component';
import { ErrorPageComponent } from './shared/components-utils/error-page/error-page.component';
import { NotFoundComponent } from './shared/components-utils/not-found/not-found.component';
import { ParentComponent } from './shared/components-utils/parent/parent.component';
import { ResultsActionsComponent } from './shared/results-actions/results-actions.component';
import { EmptyProximamenteComponent } from './shared/components-utils/empty-proximamente/empty-proximamente.component';
import { PrivacidadPerfilSettingsComponent } from './profile/account-setting/privacidad-perfil-settings/privacidad-perfil-settings.component';
import { RespuestasLegalesComponent } from './modulo-comunicacion/respuestas-legales/respuestas-legales.component';

import { EspecialidadesComponent } from "./landings/especialidades/especialidades.component";
import { AvisoLegalComponent } from './info/aviso-legal/aviso-legal.component';
import { PrivacyProfesionalPersonasFisicasComponent } from './info/privacy/sub-contenido/privacy-profesionales-personas-fisicas';
import { LoginGuard } from './_guard/login_guard';
import { DownloadKitComponent } from './landings/download-kit/download-kit.component';
import { MailchimpConfirmComponent } from './shared/footer/mailchimp-confirm/mailchimp-confirm.component';

registerLocaleData(localeEs);


export const appRoutes: Routes = [
   // {
   //   path: '', pathMatch: 'full', redirectTo: 'inicio'
   // },

   {
      path: "",
      canActivate: [IndexGuard],
      component: LandingPageComponent,
      children: []
   },
   // {
   //    path: "especialidades/:especialidad",
   //    component: EspecialidadesComponent,
   //    children: []
   // },
   { path: 'signup', component: SignupComponent, canActivate: [SignUpGuard], pathMatch: "full" },
   {
      path: "auth",
      component: AuthParentComponent,
      canActivate: [LoginGuard],
      children: [
         { path: "", pathMatch: "full", redirectTo: "login" },
         {
            path: "login",
            component: CommonLoginComponent
         },
         {
            path: "recoverpassword",
            component: ParentComponent,
            children: [
               { path: "", component: RecoverPasswordComponent },
               { path: "result/:r", component: ResultsActionsComponent }
            ]
         },
         {
            path: "signup",
            component: ParentComponent,
            children: [
               { path: "", component: RegisterCustomerComponent },
               { path: "result/:r", component: ResultsActionsComponent }
            ]
         },
         { path: "signupType", component: RegisterTypeComponent },
         {
            path: "success",
            pathMatch: "full",
            component: ResultsActionsComponent
         },
         {
            path: "resetpassword",
            component: ParentComponent,
            children: [
               { path: "", component: ResetPasswordComponent },
               { path: "result/:r", component: ResultsActionsComponent }
            ]
         },
         {
            path: "confirmAccount",
            component: ConfirmAccountComponent
         }
      ]
   },
   {
      path: "aca",
      component: ParentComponent,
      canActivate: [IndexGuard],
      children: [
         { path: "", component: AcaPresentacionComponent },
         { path: "auth/signup", component: AcaSignupComponent },
         { path: "auth/signin", component: AcaSigninComponent },
         {
            path: "auth/credentials",
            component: AcaUpdateCredentialsComponent
         }
      ]
   },
   {
      path: "ajustesconsultas",
      component: AjustesConsultasComponent,
      data: { menutitle: "Configuración", menuicon: "message-icon.svg" }
   },
   {
      path: "prices",
      component: TarifasComponent,
      canActivate: [LoggedLawyerGuard],
      pathMatch: "full"
   },
   {
      path: "payments",
      pathMatch: "full",
      data: {
         title: "Facturación",
         menutitle: "Facturas",
         menuicon: "facturas-icon.svg"
      },
      component: PagosRealizadosComponent
   },

   {
      path: "sentences",
      data: {
         title: "Resoluciones indexadas",
         menutitle: "Resoluciones Indexadas",
         menuicon: "resoluciones-icon.svg"
      },
      component: PanelSentenciasAportadasComponent,
      canActivate: [LoggedGuard, LawyerBApproved],
   },
   {
      path: "newsletter",
      component: MailchimpConfirmComponent
   },
   {
      path: "accountsettings",
      data: { title: "Ajustes de la cuenta" },
      component: AccountSettingComponent,
      children: [
         { path: "", pathMatch: "full", redirectTo: "personal-info" },
         { path: "personal-info", component: PersonalInfoComponent },
         { path: "billing-info", component: BillingInfoComponent },
         { path: "payment-info", component: PaymentInfoComponent },
         { path: "membership-info", component: MembershipInfoComponent },
         { path: "privacy", component: PrivacidadPerfilSettingsComponent }
         // { path: 'privacy-info', component:  },
         // { path: 'consultas-info', component: ConsultasInfoComponent },
      ]
   },
   { path: "mis-abogados", component: MisAbogadosComponent },
   {
      path: "abogadosettings",
      data: { title: "Ajustes de la cuenta" },
      component: AbogadoSettingsComponent,
      children: [
         {
            path: "",
            pathMatch: "full",
            redirectTo: "/accountsettings/personal-info"
         },
         {
            path: "billing-info",
            component: BillingInfoComponent,
            data: {
               menutitle: "Datos de facturación",
               menuicon: "facturas-icon.svg"
            }
         },
         {
            path: "payment-info",
            component: PaymentInfoComponent,
            data: {
               menutitle: "Métodos de pago",
               menuicon: "facturas-icon.svg"
            }
         },
         {
            path: "consultas-info",
            component: ConsultasInfoComponent,
            data: {
               menutitle: "Datos de facturación",
               menuicon: "facturas-icon.svg"
            }
         }
      ]
   },
   {
      path: 'inbox',
      data: {
         title: 'Respuestas'
      },
      component: ModuloComunicacionParentComponent,
      canActivate: [LoggedGuard],
      children: [
         {
            path: 'respuestalegal',
            component: ParentComponent,
            children: [
               {
                  path: 'datosfacturacion',
                  pathMatch: "full",
                  data: {
                     title: 'Respuesta Legal'
                  },
                  component: DatosFacturacionRespuestaLegalComponent
               },
               {
                  path: 'respuesta',
                  pathMatch: "full",
                  canActivate: [DatosFacturacionGuard],
                  data: {
                     title: 'Respuesta Legal'
                  },
                  component: RespuestaLegalModal1Component
               },
               {
                  path: 'tarifa',
                  pathMatch: "full",
                  canActivate: [DatosFacturacionGuard],
                  data: { title: 'Respuesta Legal' },
                  component: RespuestaLegalModal2Component
               }
            ]
         },

         {
            path: 'conversaciones',
            data: {
               title: 'Conversaciones',
               parent: 'inbox'
            },
            component: InboxComponent,
            children: [
               {
                  path: '',
                  pathMatch: "full",
                  component: ConversationDefaultComponent
               },
               {
                  path: ':id_conv',
                  data: {
                     title: 'Chat',
                     parent: 'inbox/conversaciones'
                  },
                  component: ConversationComponent,
                  children: [
                     {
                        path: 'r',
                        component: ResolucionRespuestaParentComponent,
                        children: [
                           {
                              path: 'rechazar/:respuestaId',
                              pathMatch: "full",
                              component: ResolucionRespuestaRechazarComponent
                           },
                           {
                              path: 'aceptar/:respuestaId',
                              component: ParentComponent,
                              children: [
                                 {
                                    path: '',
                                    component: CheckoutComponent,
                                    pathMatch: "full"
                                 },
                                 {
                                    path: 'checkout',
                                    pathMatch: "full",
                                    component: CheckoutComponent
                                 },
                                 {
                                    path: 'success',
                                    pathMatch: "full",
                                    component: CheckoutResolucionComponent
                                 }
                              ]
                           }
                        ]
                     }
                  ]
               }
            ]
         },
         {
            path: 'respuestas-legales',
            data: {
               title: 'Respuestas Legales',
               parent: 'inbox'
            },
            component: RespuestasLegalesComponent,
            children: [
               {
                  path: 'invite',
                  component: InviteClientComponent,
                  children: [{
                     path: 's',
                     pathMatch: "full",
                     component: CheckoutResolucionComponent
                  }]
               },
               {
                  path: 'enviadas',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        pathMatch: 'full',
                        data: {
                           title: 'Enviadas',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent
                     },
                     {
                        path: ':responseId',
                        data: {
                           title: 'Respuesta',
                           parent: 'inbox/enviadas'
                        },
                        component: ResponseDetailComponent
                     }
                  ]
               },
               {
                  path: 'recibidas',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        data: {
                           title: 'Recibidas',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent,
                        pathMatch: 'full'
                     },
                     {
                        path: ':responseId',
                        data: {
                           title: 'Respuesta',
                           parent: 'inbox/recibidas'
                        },
                        component: ResponseDetailComponent
                     }
                  ]
               },
               {
                  path: 'aceptadas',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        data: {
                           title: 'Aceptadas',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent
                     },
                     {
                        path: ':responseId',
                        data: {
                           title: 'Respuesta',
                           parent: 'inbox/aceptadas'
                        },
                        component: ResponseDetailComponent
                     }
                  ]
               },
               {
                  path: 'aclaraciones',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        data: {
                           title: 'Respuestas Aclaratorias',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent
                     },
                     {
                        path: ':responseId',
                        data: {
                           title: 'Respuesta',
                           parent: 'inbox/aclaraciones'
                        },
                        component: ResponseDetailComponent
                     }
                  ]
               },
               {
                  path: 'rechazadas',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        data: {
                           title: 'Rechazadas',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent
                     },
                     {
                        path: ':responseId',
                        data: {
                           title: 'Respuesta',
                           parent: 'inbox/rechazadas'
                        },
                        component: ResponseDetailComponent
                     }
                  ]
               },
               {
                  path: 'borradores',
                  component: ParentComponent,
                  children: [
                     {
                        path: '',
                        data: {
                           title: 'Borradores',
                           parent: 'inbox'
                        },
                        component: ResponsesComponent
                     }
                  ]
               }
            ]
         }
      ]
   },
   { path: "directorio", pathMatch: "full", component: SearchComponent },
   {
      path: "directorio/:derecho",
      pathMatch: "full",
      component: SearchComponent
   },
   {
      path: "directorio/:derecho/:materia",
      pathMatch: "full",
      component: SearchComponent
   },
   { path: "ranking", pathMatch: "full", component: RankingComponent },
   {
      path: "ranking/:derecho",
      pathMatch: "full",
      component: RankingComponent
   },
   {
      path: "ranking/:derecho/:materia",
      pathMatch: "full",
      component: RankingComponent
   },
   { path: "cart", pathMatch: "full", component: ShoppingCarComponent },
   {
      path: "invoice/checkout",
      component: ParentComponent,
      children: [
         {
            path: "",
            component: InvoiceCheckoutComponent
         },
         {
            path: "success/:r",
            component: ResultsActionsComponent
         }

      ]
   },
   {
      path: "admin",
      component: AdminPanelComponent,
      canActivate: [AdminGuard],
      children: [
         {
            path: "sentences",
            component: AdminSentenciasComponent,
            canActivate: [AdminGuard]
         },
         {
            path: "add",
            component: PanelSentenciasComponent,
            pathMatch: "full",
            canActivate: [AdminGuard]
         },
         {
            path: "registered",
            component: AdminUsuariosComponent,
            pathMatch: "full",
            canActivate: [AdminGuard]
         },
         {
            path: "detail",
            component: AdminProfilesComponent,
            pathMatch: "full",
            canActivate: [AdminGuard]
         },
         {
            path: "tree",
            component: AdminArbolComponent,
            pathMatch: "full",
            canActivate: [AdminGuard]
         }
      ]
   },
   { path: "metodologia", component: MetodologiaComponent },
   {
      path: 'soy-abogado', component: LandingSoyabogadoComponent
   },
   {
      path: 'nosotros', component: NosotrosComponent
   },
   {
      path: 'nosotros/kitprensa', component: DownloadKitComponent
   },
   {
      path: 'soy-abogado-expertia', component: LandingSoybogadoEmeritaComponent
   },

   {
      path: "info/privacidad",
      component: ParentComponent,
      children: [
         {
            path: "",
            pathMatch: "full",
            data: { title: "Política de Privacidad", locationBack: true },
            component: PrivacyComponent
         },
         {
            path: "profesionales-personas-fisicas",
            pathMatch: "full",
            data: { title: "Profesionales Personas Fisicas" },
            component: PrivacyProfesionalPersonasFisicasComponent
         },
         {
            path: "clientes-usuarios",
            pathMatch: "full",
            data: { title: "Usuarios y Clientes", locationBack: true },
            component: PrivacyClientsComponent
         },
         {
            path: "contactos-web",
            pathMatch: "full",
            data: { title: "Contactos Web", locationBack: true },
            component: PrivacyContactosWebComponent
         },
         {
            path: "provedores",
            pathMatch: "full",
            data: { title: "Provedores", locationBack: true },
            component: PrivacyProvedoresComponent
         },
         {
            path: "recurosos-humanos",
            pathMatch: "full",
            data: { title: "Recursos Humanos", locationBack: true },
            component: PrivacyRecursosComponent
         }
      ]
   },
   {
      path: "info/aviso-legal", pathMatch: "full", data: { title: "Aviso Legal" }, component: AvisoLegalComponent
   },
   {
      path: "info/cookies",
      pathMatch: "full",
      data: { title: "Política de Cookies", locationBack: true },
      component: CookiesComponent
   },
   {
      path: "info/condiciones",
      pathMatch: "full",
      data: { title: "Condiciones Usuarios", locationBack: true },
      component: CondicionesComponent
   },
   {
      path: "info/condiciones-profesionales",
      pathMatch: "full",
      data: { title: "Condiciones Profesionales", locationBack: true },
      component: CondionesProfesionalesComponent
   },
   { path: "error-page", component: ErrorPageComponent },
   { path: "proximamente", component: EmptyProximamenteComponent },
   { path: "404", component: NotFoundComponent },
   { path: "**", redirectTo: "/404" }
];