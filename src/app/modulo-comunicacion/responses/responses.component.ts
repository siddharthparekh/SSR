import { Conversacion } from './../../_models/Conversacion';

import { map, takeUntil, filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { IRespuestaLegal } from './../../_models/RespuestaLegal';
import { LegalResponseService } from './../../_services/legal-response.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { SharedModalResponseService } from './../_services/shared-modal-response.service';

@Component({
   selector: 'app-responses',
   templateUrl: './responses.component.html',
   styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

   respuestas$: Observable<IRespuestaLegal[]>;
   ngUnsubscribe: Subject<void> = new Subject<void>();
   estatusUrlParam: string;
   isCustomer: boolean = false;

   constructor(private responseService: LegalResponseService,
      private router: Router,
      private route: ActivatedRoute,
      private sharedUserService: SharedUserService,
      private sharedResponseService: SharedModalResponseService
   ) {
      this.router.events.pipe(
         filter(e => e instanceof NavigationEnd))
         .subscribe((event: RouterEvent) => this.intercep(event));
   }

   intercep(event: RouterEvent) {
      this.estatusUrlParam = event.url.split('/').splice(-1)[0];
      let estatusRespuesta = this.getEstatusRespuesta(this.estatusUrlParam);
      if (estatusRespuesta) this.respuestas$ = this.responseService.getLegalResponses(estatusRespuesta).pipe(
         takeUntil(this.ngUnsubscribe),
         map(respuestas => respuestas.map(respuesta => {
            let dateEnviada = new Date(respuesta['createdAt']);
            let now = new Date();
            var timeDiff = Math.abs(dateEnviada.getTime() - now.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            respuesta['dateEnviada'] = diffDays;
            if (!this.isCustomer && estatusRespuesta != 'BORRADOR') {
               respuesta.Mensaje.Conversacion.destinatario = respuesta.Conversacion.Usuarios.find(u => u.id != respuesta.Mensaje.Remitente.id);
            }
            else if (!this.isCustomer && estatusRespuesta == 'BORRADOR') {
               respuesta.Conversacion.destinatario = respuesta.Conversacion.Usuarios.find(u => u.id != this.sharedUserService.getUserId())
            }
            return respuesta

         })));
   }
   ngOnInit() {
      this.isCustomer = this.sharedUserService.getUserTipo() == 1 ? true : false;
   }
   getEstatusRespuesta(estatusUrl: string): string {
      switch (estatusUrl) {
         case 'borradores': return 'BORRADOR'
         case 'aceptadas': return 'ACEPTADA';
         case 'enviadas': return 'ENVIADA';
         case 'recibidas': return 'ENVIADA';
         case 'aclaraciones': return 'PENDIENTE_ACLARACION';
         case 'rechazadas': return 'RECHAZADA';
         default: return undefined;
      }
   }

   goTo(respuesta: IRespuestaLegal) {
      if (this.isCustomer && respuesta.estado === 'ENVIADA') {
         this.router.navigate(['inbox', 'conversaciones', respuesta.Conversacion.id]);
      } else if (!this.isCustomer && respuesta.estado === 'BORRADOR') {
         this.router.navigate(["/inbox/respuestalegal/respuesta"], {
            queryParams: {
               c: respuesta.Conversacion.id,
               d: respuesta.Conversacion.destinatario.id
            }
         });
      }
      else {
         this.router.navigate([respuesta.id], { relativeTo: this.route });
      }
   }
   setResponse(respuesta) {
      this.sharedResponseService.setResponseClient(respuesta);
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
}
