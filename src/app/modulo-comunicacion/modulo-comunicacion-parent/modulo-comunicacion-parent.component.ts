import { Component, HostListener, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ToastyConfig, ToastyService } from 'ng2-toasty';

import { takeUntil, map, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { SharedUserService } from '../../_services/shared-user.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { IConversacion } from './../../_models/Conversacion';
import { IRespuestaLegal } from './../../_models/RespuestaLegal';
import { LegalResponseService } from './../../_services/legal-response.service';
import { MessengerService } from './../../_services/messenger.service';
import { SharedComunicationService } from './../_services/shared-state-comunication.service';


@Component({
   selector: "app-modulo-comunicacion-parent",
   templateUrl: "./modulo-comunicacion-parent.component.html",
   styleUrls: ["./modulo-comunicacion-parent.component.css"],
   providers: [LegalResponseService, SharedComunicationService]
})
export class ModuloComunicacionParentComponent implements OnInit, OnDestroy {
   private ngUnsubscribe: Subject<void> = new Subject<void>();
   SM: number = 576;
   conversations: IConversacion[];
   level: number;
   isCustomer: boolean = true;
   screenWidth: number;
   conversacionesSelected: boolean;
   hideTab: boolean = false;
   conversationsUnread = 0;
   responseUnread = 0;
   notify: boolean = false;
   estatusUrlParam: string;
   respuestas$: Observable<IRespuestaLegal[]>;
   hideBack = false;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private title: Title,
      private router: Router,
      private route: ActivatedRoute,
      private messengerService: MessengerService,
      private sharedComunicationService: SharedComunicationService,
      private sharedUserService: SharedUserService,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private responseService: LegalResponseService,
      private renderer: Renderer2,
   ) {
      this.renderer.addClass(document.body, 'modcomunicaciones');
      this.toastyConfig.theme = "default";
      this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            this.level = event.url.split("/").length - 1;
            this.screenWidth = window.innerWidth;
            this.sharedComunicationService.emitLevel(
               this.level,
               this.screenWidth,
               this.SM
            );
            if (event.url.includes("conversaciones")) {
               this.conversacionesSelected = true;
            } else {
               this.conversacionesSelected = false;
            }
            this.checkIfMustHideTab();
         }
      });
      this.intercep();
   }

   @HostListener("window:resize", ["$event"])
   onResize(event) {
      this.screenWidth = event.target.innerWidth;
      this.sharedComunicationService.emitLevel(
         this.level,
         this.screenWidth,
         this.SM
      );
      this.checkIfMustHideTab();
   }

   ngOnInit() {
      window.scroll(0, 0);
      this.screenWidth = window.innerWidth;
      this.title.setTitle("Mensajes");
      if (this.router.url.includes("conversaciones")) {
         this.conversacionesSelected = true;
      } else {
         this.conversacionesSelected = false;
      }
      this.isCustomer = this.sharedUserService.getUserTipo() === 1 ? true : false;
      this.messengerService
         .getConversations()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(conversations => {
            this.sharedComunicationService.setConversations(conversations);
            this.conversations = conversations;
            this.conversations.map(c => {
               const i = c.Usuarios.findIndex(u => u.id == this.sharedUserService.getUser().id);
                c.Usuarios.splice(i, 1);
               if (this.shouldINotify(c, this.sharedUserService.getUserId())) {
                 this.messengerService.emitNotify();
               } else c.visto = true;
             });
            this.notify = this.isAnyConversationUnread(this.conversations);
         });
      this.onConversationIn();
      this.onMessageIn();
      this.messengerService.onNotify().pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(idConv => {
            //se notifica un numero > 0 significa que é o id dunha conversa e que xa se veu (visto = true);
            if (idConv > 0) {
               let conv = this.conversations.find(c => c.id == idConv);
               if (conv) {
                  conv.visto = true;
               }
               this.conversationsUnread = 0;
               this.notify = this.isAnyConversationUnread(this.conversations);
            } else {
               this.notify = true;
            }
         });
   }

   ngOnDestroy() {
      // $("footer").css("display", "block");
      this.renderer.removeClass(document.body, 'modcomunicaciones');
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }

   selectRespuestasTab() {
      this.conversacionesSelected = false;
   }

   onMessageIn() {
      this.messengerService.onMessageIn().pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe((dataMsg) => {
            if (dataMsg.conversation.id > 0) {
               let conv = this.conversations.find(c => c.id == dataMsg.conversation.id);
               if (conv) {
                  conv.visto = false;
                  this.conversationsUnread = 0;
                  this.notify = this.isAnyConversationUnread(this.conversations);
               }
            }
         })
   }
   onConversationIn() {
      this.messengerService.onConversationIn().pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(c => {
            c.visto = false;
            this.conversations.unshift(c);
            this.conversationsUnread = 0;
            this.notify = this.isAnyConversationUnread(this.conversations);
            this.conversations.splice(0, 1);
         });
   }

   selectConversacionesTab() {
      this.conversacionesSelected = true;
   }

   goBack() {
      let urlItem = this.router.url.split("/")
      // Para volver atras desde respuesta legal
      if (this.router.url.includes("respuestas-legales")) {
         if (this.level == 4) {
            let newUrl = urlItem[2] + "/" + urlItem[3];
            this.router.navigate([newUrl], { relativeTo: this.route });
         }
      }
   }

   checkIfMustHideTab() {
      if (this.router.url.includes("respuestas-legales")) {
         if (this.level == 4) {
            this.hideBack = true;
            this.hideTab = true;
         } else {
            this.hideBack = false;
            this.hideTab = false;
         }
      } else if (this.router.url.includes("conversaciones")) {
         if (this.level == 3 && this.screenWidth < 768) {
            this.hideTab = true
         } else {
            this.hideTab = false;
         }
      } else if (this.router.url.includes("respuestalegal")) {
         this.hideTab = true
      } else {
         this.hideTab = false;
      }
   }

   intercep() {
      this.estatusUrlParam = "recibidas";
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

   isAnyConversationUnread(conversaciones: IConversacion[]): boolean {
      // const myUserId = this.sharedUserService.getUserId();
      conversaciones.forEach(function (conv) {
         // const mensajes = conv.Mensajes;
         // conv.visto = !conv.visto && (mensajes.length > 0 && myUserId == mensajes[0].Remitente.id);
         if (!conv.visto) {
            this.conversationsUnread = this.conversationsUnread + 1;
         }
      }, this);
      return true;
   }

   shouldINotify(conversation: IConversacion, myUserId: number) {
      const mensajes = conversation.Mensajes;
      const valor = (!conversation.visto && (mensajes && myUserId != mensajes[0].Remitente.id));
      return valor;
   }

}