import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IConversacion } from '../../../_models/Conversacion';
import { MessengerService } from '../../../_services/messenger.service';
import { SharedUserService } from '../../../_services/shared-user.service';
import { SharedComunicationService } from './../../_services/shared-state-comunication.service';

@Component({
   selector: "app-inbox",
   templateUrl: "./inbox.component.html",
   styleUrls: ["./inbox.component.css"],
   providers: []
})
export class InboxComponent implements OnInit {
   convs: IConversacion[] = [];
   private ngUnsubscribe: Subject<void> = new Subject<void>();
   level: number;
   SM: number;
   screenWidth: number
   conversacionesSelected: boolean = true;
   options: Array<object> = [
      {
         'option': 'Conversaciones activas',
         'id': 'activeConversations'
      },
      {
         'option': 'Conversaciones inactivas',
         'id': 'inactiveConversations'
      }
   ]
   selectedOption: string;

   constructor(
      private messengerService: MessengerService,
      private sharedUserService: SharedUserService,
      private sharedComunicationService: SharedComunicationService,
      private route: ActivatedRoute
   ) {
      this.sharedComunicationService.onLevel().subscribe(objState => {
         this.level = objState.level;
         this.SM = objState.SM;
         this.screenWidth = objState.screenWidth;
      });
   }

   ngOnInit() {
      this.getConversations();
      this.selectedOption = "activeConversations";
   }
   getConversations() {
      this.sharedComunicationService
         .getConversations()
         .pipe(
            takeUntil(this.ngUnsubscribe),
            tap(c => c.map(co => {
               let u = co.Usuarios.find(u => u.id != this.sharedUserService.getUserId());
               if (u) co.destinatario = u;
               return co;
            })
            )
         ).subscribe(e => {
            this.convs = e;
            this.convs.forEach(c => {
               if (isMessageSendByMe(c, this.sharedUserService.getUserId()))
                  c.visto = true;
            });
            this.onMessagingEvent();
         });
   }
   onMessagingEvent() {
      this.messengerService
         .onConversationIn()
         .pipe(
            takeUntil(this.ngUnsubscribe),
            tap(co => {
               let u = co.Usuarios.find(
                  u => u.id != this.sharedUserService.getUserId()
               );
               if (u) co.destinatario = u;
               return co;
            })
         )
         .subscribe(val => {
            if (!this.convs) this.convs = [];
            this.convs.unshift(val);
         });
      this.messengerService
         .onMessageIn()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(dataMsg => {
            this.moveItemToStart(this.convs, dataMsg.message.Conversacion.id);
            this.setConversationAsUnread(dataMsg.message.Conversacion.id);
            this.messengerService.emitNotify();
         });
      this.messengerService
         .onNotify()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(idConv => {
            if (idConv > 0) {
               let conv = this.convs.find(c => c.id == idConv);
               if (conv) conv.visto = true;
            }
         });
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
   moveItemToStart(array: any[], idItem: number): void {
      if (!array) return;
      if (array[0].id == idItem) return;
      const i: number = array.findIndex(c => c.id == idItem);
      if (i < 0) return;
      const copyConv: any = Object.assign({}, array[i]);
      array.splice(i, 1);
      array.unshift(copyConv);
      return;
   }
   setConversationAsUnread(idConv: number): void {
      const i = this.convs.findIndex(c => c.id == idConv);
      if (i < 0) return;
      this.convs[i].visto = false;
   }
}
function isMessageSendByMe(conversation: IConversacion, myUserId: number) {
   const mensajes = conversation.Mensajes;
   return (
      !conversation.visto && (mensajes && mensajes.length > 0 && myUserId == mensajes[0].Remitente.id)
   );
}
