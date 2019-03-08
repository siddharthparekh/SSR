import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConversationComponent } from './conversations/conversation/conversation.component';
import { ModuloComunicacionParentComponent } from './modulo-comunicacion-parent/modulo-comunicacion-parent.component';
import { InboxComponent } from './conversations/inbox/inbox.component';
import { RespuestaLegalModal1Component } from './respuesta-legal/respuesta-legal-modal-1/respuesta-legal-modal-1.component';
import { RespuestaLegalParentComponent } from './respuesta-legal/respuesta-legal-parent/respuesta-legal-parent.component';
import { RespuestaLegalModal2Component } from './respuesta-legal/respuesta-legal-modal-2/respuesta-legal-modal-2.component';
import { RespuestaLegalModal3Component } from './respuesta-legal/respuesta-legal-modal-3/respuesta-legal-modal-3.component';
import { ConversationDefaultComponent } from './conversation-default/conversation-default.component';
import { ResolucionRespuestaParentComponent } from './modals/resolucion-respuesta/resolucion-respuesta-parent/resolucion-respuesta-parent.component';
import { ResolucionRespuestaRechazarComponent } from './modals/resolucion-respuesta/resolucion-respuesta-rechazar/resolucion-respuesta-rechazar.component';
import { ParentComponent } from './../shared/components-utils/parent/parent.component';
import { ResponsesComponent } from './responses/responses.component';
import { ResponseDetailComponent } from './response-detail/response-detail.component';

const moduloComunicacionRoutes: Routes = [
  {
    path: 'inbox', component: ModuloComunicacionParentComponent, children: [
      {
        path: '', redirectTo: 'conversaciones', pathMatch: 'full'
      },
      {
        path: 'conversaciones', data: { title: 'Conversaciones' }, component: InboxComponent, children: [
          {
            path: '', pathMatch: "full", component: ConversationDefaultComponent
          },
          {
            path: ':id_conv', data: { title: 'Chat', parent: 'inbox/conversaciones' }, component: ConversationComponent, children: [
              {
                path: 'respuesta', pathMatch: "full", component: RespuestaLegalModal1Component
              },
              {
                path: 'tarifa', pathMatch: "full", component: RespuestaLegalModal2Component
              },
              {
                path: 'presupuesto', pathMatch: "full", component: RespuestaLegalModal3Component
              },
              //outro modal
              { path: 'rechazar/:respuestaId', pathMatch: "full", component: ResolucionRespuestaRechazarComponent }
            ]
          }
        ]
      },
      {
        path: 'enviadas', component: ParentComponent, children: [
          { path: '', pathMatch: 'full', data: { title: 'Respuestas Enviadas' }, component: ResponsesComponent },
          { path: ':responseId', data: { title: 'Detalle Respuesta', parent: 'inbox/enviadas' }, component: ResponseDetailComponent }
        ]
      },
      {
        path: 'recibidas', component: ParentComponent, children: [
          { path: '', pathMatch: 'full', data: { title: 'Respuestas Recibidas' }, component: ResponsesComponent },
          { path: ':responseId', data: { title: 'Detalle Respuesta', parent: 'inbox/recibidas' }, component: ResponseDetailComponent }
        ]
      },
      { path: 'aceptadas', data: { title: 'Respuestas Enviadas' }, component: ResponsesComponent },
      { path: 'aclaraciones', data: { title: 'Respuestas Enviadas' }, component: ResponsesComponent },
      { path: 'rechazadas', data: { title: 'Respuestas Enviadas' }, component: ResponsesComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(moduloComunicacionRoutes)
  ]
})
export class ModuloComunicacionRoutingModule { }
