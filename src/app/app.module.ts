import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SidebarModule } from 'ng-sidebar';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxPaginationModule } from 'ngx-pagination';
import { CookieLawModule } from 'angular2-cookie-law';

import { ClickOutsideDirective } from './_directives/click-outside.directive';
import { AdminGuard } from './_guard/admin_guard';
import { DatosFacturacionGuard } from './_guard/datos_facturacion_guard';
import { IndexGuard } from './_guard/index_guard';
import { LoggedGuard } from './_guard/logged_guard';
import { LoggedLawyerGuard } from './_guard/logged_lawyer_guard';
import { LoginGuard } from './_guard/login_guard';
import { SignUpGuard } from './_guard/signup_guard';
import { CustomerService } from './_services/customer.service';
import { MessengerService } from './_services/messenger.service';
import { ModalsService } from './_services/modals.service';
import { PaymentsService } from './_services/payments.service';
import { ProfesionalService } from './_services/profesional.service';
import { RoutesService } from './_services/routes.service';
import { SentenceService } from './_services/sentence.service';
import { SharedUserService } from './_services/shared-user.service';
import { GeocodeService } from './_services/geocode.service';
import { HandleError } from './_utils/handleError';
import { ToastOptionsClass } from './_utils/toastOptionsClass';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { appRoutes } from './appRoutes';
import { AutorizacionModule } from './autorizacion/autorizacion.module';
import { SearchModule as BusquedasModule } from './busquedas/search.module';
import { InfoModule } from './info/info.module';
import { LandingsModule } from './landings/landings.module';
import { ModulocomunicacionModule } from './modulo-comunicacion/modulo-comunicacion.module';
import { ProfileModule } from './profile/profile.module';
import { NotFoundComponent } from './shared/components-utils/not-found/not-found.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarMenuComponent } from './shared/sidebar-menu/sidebar-menu.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SideBarEmitterService } from './_services/side-bar-emitter.service';

// the second parameter 'fr' is optional
registerLocaleData(localeEs, "es");

// const appRoutes: Routes = [
//   { path: '', loadChildren: 'app/landings/landings.module#LandingsModule' },
//   { path: '404', component: NotFoundComponent, pathMatch: "full" },
//
//   { path: 'a', loadChildren: 'app/autorizacion/autorizacion.module#AutorizacionModule' },
//   { path: '', loadChildren: 'app/profile/profile.module#ProfileModule' },
//
//   { path: 'search', pathMatch: "full", data: { title: 'Resultados de la búsqueda' }, component: SearchComponent },
//   {
//     path: 'panel/a0852dc53078218572fbc136acabdec54aa0e44e3c756e4f186dc1b90f2115c2',
//     component: PanelSentenciasComponent, pathMatch: "full", canActivate: [LoggedGuard]
//   },
//   { path: 'office', loadChildren: 'app/office-profile/office.module#OfficeModule' },
//   { path: 'mc', loadChildren: 'app/modulo-comunicacion/modulo-comunicacion.module#ModulocomunicacionModule', canActivate: [LoggedGuard] },
//
//   { path: 'info/privacidad', pathMatch: "full", data: { title: "Política de Privacidad", locationBack: true }, component: PrivacyComponent },
//   { path: 'info/cookies', pathMatch: "full", data: { title: "Política de Cookies", locationBack: true }, component: CookiesComponent },
//   { path: 'info/condiciones', pathMatch: "full", data: { title: "Condiciones Usuarios", locationBack: true }, component: CondicionesComponent },
//   { path: 'info/condiciones-profesionales', pathMatch: "full", data: { title: "Condiciones Usuarios Profesionales", locationBack: true }, component: CondionesProfesionalesComponent },
//
//   { path: '**', component: NotFoundComponent }
// ];

// import * as Raven from 'raven-js';
// Raven
//   .config('https://f6d3e1d7e3d740f8a373383ccefa2c79@sentry.io/298074')
//   .install();
//
// export class RavenErrorHandler implements ErrorHandler {
//   handleError(err: any): void {
//     if (environment.production)
//       Raven.captureException(err.originalError || err);
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarMenuComponent,
    FooterComponent,
    NotFoundComponent,
    ClickOutsideDirective
  ],
  imports: [
    AccordionModule.forRoot(),
    CollapseModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    // StarRatingModule.forRoot(),
    // NgbModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    SidebarModule.forRoot(),
    NgxPaginationModule,
    CookieLawModule,
    DeviceDetectorModule.forRoot(),
    // SharedModule,
    BusquedasModule,
    AdminModule,
    ModulocomunicacionModule,
    ProfileModule,
    AutorizacionModule,
    LandingsModule,
    InfoModule,
    NgxChartsModule
  ],
  providers: [
    ProfesionalService,
    PaymentsService,
    CustomerService,
    HandleError,
    ToastOptionsClass,
    SignUpGuard,
    IndexGuard,
    LoginGuard,
    LoggedGuard,
    AdminGuard,
    LoggedLawyerGuard,
    SentenceService,
    MessengerService,
    ModalsService,
    RoutesService,
    SharedUserService,
    GeocodeService,
    ToastyService,
    DatosFacturacionGuard,
    SideBarEmitterService,
    { provide: LOCALE_ID, useValue: "es" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
