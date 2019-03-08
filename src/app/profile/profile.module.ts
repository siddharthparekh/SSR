import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguiStickyModule } from '@ngui/sticky';
import { ArchwizardModule } from 'angular-archwizard';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxPaginationModule } from 'ngx-pagination';

import { LawyerBApproved } from './../_guard/lawyer_b_approved';
import { SharedModule } from './../shared/shared.module';
import { AbogadoSettingsComponent } from './abogado-settings/abogado-settings.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { CardSettingsComponent } from './account-setting/card-settings/card-settings.component';
import { EmptyPagosComponent } from './account-setting/card-settings/empty-pagos/empty-pagos.component';
import { AjustesConsultasComponent } from './account-setting/consultas/consultas.component';
import { ContactoColegioComponent } from './account-setting/modals/contacto-colegio/contacto-colegio.component';
import { TarifasComponent } from './account-setting/tarifas/tarifas.component';
import { AgencyAboutComponent } from './agency-about/agency-about.component';
import { AgencyContactComponent } from './agency-contact/agency-contact.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { ConsultasInfoComponent } from './consultas-info/consultas-info.component';
import { ProfileDetailsModule } from './details/profile-details.module';
import { LoadingModule } from '../shared/components-utils/loading/loading.module';
import { MembershipInfoComponent } from './account-setting/membership-info/membership-info.component';
import { EmptyFacturasComponent } from './pagos-realizados/empty-facturas/empty-facturas.component';
import { PagosRealizadosComponent } from './pagos-realizados/pagos-realizados.component';
import {
  ModalShowSentenceComponent,
} from './panel-sentencias-aportadas/modals/modal-show-sentence/modal-show-sentence.component';
import { PanelSentenciasAportadasComponent } from './panel-sentencias-aportadas/panel-sentencias-aportadas.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileRoutingModule } from './profile-routing';
import { ProfileComponent } from './profile.component';
import { ModalExplicacionComponent } from './sidebar/modal-explicacion/modal-explicacion.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SummaryModule } from './summary/summary.module';
import { TalkButtonModule } from './talk-button/talk-button.module';
import { ProfileRedirectComponent } from './profile-redirect.component';
import { PrivacidadPerfilSettingsComponent } from './account-setting/privacidad-perfil-settings/privacidad-perfil-settings.component';
import { ModalsModule } from '../shared/modals/modals.module';
import { SharedLinkModule } from '../shared/components-utils/shared-link/shared-link.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ProfileRoutingModule,
    NguiStickyModule,
    AccordionModule.forRoot(),
    ArchwizardModule,
    NgxPaginationModule,
    LoadingModule,
    SummaryModule,
    ProfileDetailsModule,
    TalkButtonModule,
    ModalsModule,
    SharedLinkModule
  ],
  declarations: [
    ProfileComponent,
    ProfileRedirectComponent,
    AgencyAboutComponent,
    AgencyContactComponent,
    AccountSettingComponent,
    PanelSentenciasAportadasComponent,
    ModalShowSentenceComponent,
    SidebarComponent,
    CardSettingsComponent,
    PagosRealizadosComponent,
    ContactoColegioComponent,
    ModalExplicacionComponent,
    TarifasComponent,
    AjustesConsultasComponent,
    PersonalInfoComponent,
    BillingInfoComponent,
    PaymentInfoComponent,
    MembershipInfoComponent,
    ConsultasInfoComponent,
    AbogadoSettingsComponent,
    EmptyPagosComponent,
    EmptyFacturasComponent,
    PrivacidadPerfilSettingsComponent,
  ],
  providers: [LawyerBApproved],
  exports: [CardSettingsComponent]
})
export class ProfileModule { }
