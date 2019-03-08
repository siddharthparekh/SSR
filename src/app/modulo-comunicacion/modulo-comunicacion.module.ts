import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloComunicacionRoutingModule } from './modulo-comunicacion-routing.module';
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { SharedModule } from './../shared/shared.module';
import { QuillModule } from 'ngx-quill';


//components
import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ModuloComunicacionParentComponent } from './modulo-comunicacion-parent/modulo-comunicacion-parent.component';
import { InboxComponent } from './conversations/inbox/inbox.component';
import { RespuestaLegalComponent } from './conversations/conversation/respuesta-legal/respuesta-legal.component';
import { RespuestaLegalModal1Component } from './respuesta-legal/respuesta-legal-modal-1/respuesta-legal-modal-1.component';
import { RespuestaLegalParentComponent } from './respuesta-legal/respuesta-legal-parent/respuesta-legal-parent.component';
import { RespuestaLegalModal2Component } from './respuesta-legal/respuesta-legal-modal-2/respuesta-legal-modal-2.component';
import { RespuestaLegalModal3Component } from './respuesta-legal/respuesta-legal-modal-3/respuesta-legal-modal-3.component';
import { ConversationDefaultComponent } from './conversation-default/conversation-default.component';
import { ResolucionRespuestaRechazarComponent } from './modals/resolucion-respuesta/resolucion-respuesta-rechazar/resolucion-respuesta-rechazar.component';
import { ResponsesComponent } from './responses/responses.component';
import { ResponseDetailComponent } from './response-detail/response-detail.component';
import { ValoracionRespuestaComponent } from './modals/valoracion-respuesta/valoracion-respuesta.component';
import { ResolucionRespuestaParentComponent } from './modals/resolucion-respuesta/resolucion-respuesta-parent/resolucion-respuesta-parent.component';
import { AclaracionComponent } from './modals/aclaracion/aclaracion.component';
import { RespuestasLegalesComponent } from './respuestas-legales/respuestas-legales.component';

import { SharedModalResponseService } from './_services/shared-modal-response.service';
import { CheckoutComponent } from './modals/resolucion-respuesta/resolucion-respuesta-aceptar/checkout/checkout.component';
import { CheckoutResolucionComponent } from './modals/resolucion-respuesta/resolucion-respuesta-aceptar/checkout-resolucion/checkout-resolucion.component';
import { ChatArchivoComponent } from './conversations/conversation/chat-archivo/chat-archivo.component';
import { ConversationConfigurarCasoComponent } from './conversations/conversation-configurar-caso/conversation-configurar-caso.component';
import { InviteClientComponent } from './conversations/invite-client/invite-client.component';
import { DatosFacturacionRespuestaLegalComponent } from './respuesta-legal/datos-facturacion-respuesta-legal/datos-facturacion-respuesta-legal.component';
import { EmptyConsultasComponent } from './empty-consultas/empty-consultas.component';
import { LoadingModule } from '../shared/components-utils/loading/loading.module';
import { DndDirective } from './conversations/conversation/dnd.directive';
import { ProfileModule } from '../profile/profile.module';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    LoadingModule,
    ProfileModule,
    // ModuloComunicacionRoutingModule,
    QuillModule
  ],
  declarations: [
    ConversationComponent,
    ModuloComunicacionParentComponent,
    InboxComponent,
    Autosize,
    RespuestaLegalComponent,
    RespuestaLegalModal1Component,
    RespuestaLegalParentComponent,
    RespuestaLegalModal2Component,
    RespuestaLegalModal3Component,
    ConversationDefaultComponent,
    ResolucionRespuestaRechazarComponent,
    ResponsesComponent,
    ResponseDetailComponent,
    ValoracionRespuestaComponent,
    ResolucionRespuestaParentComponent,
    AclaracionComponent,
    CheckoutComponent,
    CheckoutResolucionComponent,
    ChatArchivoComponent,
    ConversationConfigurarCasoComponent,
    InviteClientComponent,
    DatosFacturacionRespuestaLegalComponent,
    EmptyConsultasComponent,
    RespuestasLegalesComponent,
    DndDirective
  ],
  providers: [SharedModalResponseService]
})
export class ModulocomunicacionModule { }
