import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IConversacion } from '../../../_models/Conversacion';
import { IMensaje } from '../../../_models/Mensaje';
import { Profesional } from '../../../_models/Profesional';
import { IRespuestaLegal } from '../../../_models/RespuestaLegal';
import { MessengerService } from '../../../_services/messenger.service';
import { SharedUserService } from '../../../_services/shared-user.service';
import { UserService } from '../../../_services/user.service';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';
import { EstadoConv } from './../../../_models/Conversacion';
import { LegalResponseService } from './../../../_services/legal-response.service';
import { SharedModalResponseService } from './../../_services/shared-modal-response.service';

@Component({
   selector: 'app-conversation',
   templateUrl: './conversation.component.html',
   styleUrls: ['./conversation.component.css'],
   providers: [UserService],
   //   encapsulation: ViewEncapsulation.None
})
export class ConversationComponent implements OnInit {
   conversation: IConversacion = {} as IConversacion;
   scrolling: boolean = false;
   textoNewMsg: string = "";
   isCustomer: boolean = true;
   blockInputConversation: boolean = false;
   uploadInfo: { progress: number; msgId: number };
   private ngUnsubscribe: Subject<void> = new Subject<void>();
   CONVERSACION_INICIAL = EstadoConv.ConversacionInicial;
   CONVERSACION_RECHAZADA = EstadoConv.Rechazada;
   CONVERSACION_ACEPTADA = EstadoConv.Aceptada;
   CONV_CONFIGURADA = EstadoConv.CasoConfigurado;
   CONVERSACION_PREGUNTA = EstadoConv.Pregunta;
   modal: BsModalRef;
   showAlert = true;
   placeholderCustomer = "Escribe...";
   hidePlaceholder = false;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private messengerService: MessengerService,
      private userService: UserService,
      private sharedUserService: SharedUserService,
      private title: Title,
      private sharedResponseService: SharedModalResponseService,
      private legalResponseService: LegalResponseService,
      private modalService: BsModalService,
      private router: Router,
      private route: ActivatedRoute
   ) {
      this.toastyConfig.theme = "default";
   }

   ngOnInit() {
      this.title.setTitle("Mensajes");
      this.isCustomer = this.sharedUserService.getUser().tipo == 1 ? true : false;
      this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
         this.conversation.id = params["id_conv"];
         this.fetchAllMsgConversation();
      });
      this.onMessageIn();
      this.subscriptions();
   }
   subscriptions() {
      this.messengerService
         .onProgressFile()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(uploadInfo => (this.uploadInfo = uploadInfo));
      this.sharedResponseService
         .onResolveResponse()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(msg =>
            this.sendAdminMsg(msg).subscribe(
               (msg: IMensaje) => {
                  this.conversation.estado = EstadoConv.CasoConfigurado;
                  this.fetchAllMsgConversation();
                  this.conversation.Mensajes.push(msg);
                  scrollDown();
               },
               err => {
                  this.displayError(err);
               }
            )
         );
   }
   openModal(template: any, modalName) {
      if (modalName == 'configurarCaso') {
         this.modal = this.modalService.show(template, Object.assign({}, { class: 'modal-lg modal-configurar-caso' }));
      }
      if (modalName == 'configurarDatosFacturacion') {
         this.modal = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
      }
   }
   closeModal() {
      this.modal.hide();
   }
   onMessageIn() {
      this.messengerService
         .onMessageIn()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(dataMsg => {
            if (dataMsg.conversation.id === this.conversation.id) {
               this.conversation.Mensajes.push(dataMsg.message);
               this.conversation.estado = dataMsg.conversation.estado;
               scrollDown();
               this.fetchAllMsgConversation();
               this.messengerService
                  .setAsReaded(this.conversation.id)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(
                     () => {
                        this.messengerService.emitConvReaded(this.conversation.id);
                     },
                     err => { }
                  );
            }
         });
   }
   fetchAllMsgConversation() {
      this.messengerService
         .getAllMessagesConversation(this.conversation.id)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (conv: any) => {
               this.conversation = conv;
               this.conversation.destinatario = this.conversation.Usuarios.find(
                  u => u.id !== this.sharedUserService.getUserId()
               );
               //comprobamos si o ultimo mensaxe enviado é do tipo distitnto a 0 (mensaxe normal), así sabemos que se trata
               //ou dunha aclaración ou dunha resposta legal
               this.updateStatusResponse();
               scrollDown();
               if (
                  shouldINotify(this.conversation, this.sharedUserService.getUserId())
               ) {
                  this.messengerService
                     .setAsReaded(this.conversation.id)
                     .pipe(takeUntil(this.ngUnsubscribe))
                     .subscribe(
                        () => {
                           this.messengerService.emitConvReaded(this.conversation.id);
                        },
                        err => { }
                     );
               }
            },
            err => {
               this.displayError(err);
            }
         );
   }
   sendContentTextArea(msg: string) {
      //comprobamos si hai SOLO saltos de linea ou espacios
      let cleanString = msg.replace(/\r?\n|\r/g, "");
      cleanString = cleanString.trim();
      if (cleanString != "") {
         if (
            this.conversation.estado == EstadoConv.Aceptada ||
            this.conversation.estado == EstadoConv.CasoConfigurado
         ) {
            this.sendTextMsg(msg);
         } else if (
            this.conversation.estado == EstadoConv.RespuestaLegal ||
            this.conversation.estado == EstadoConv.Pregunta ||
            (this.conversation.estado == EstadoConv.Aclaracion && !this.isCustomer)
         ) {
            this.sendAclaration(msg);
         }
         this.textoNewMsg = "";
      }
   }
   sendAdminMsg(msg: string) {
      return this.messengerService.sendMsg({
         ConversacionId: this.conversation.id,
         RemitenteId: this.sharedUserService.getUserId(),
         texto: msg,
         DestinatarioId: this.conversation.destinatario.id,
         nombreRemitente: "Emerita Bot",
         tipo: 20
      });
   }
   setConversationAsConfigured(days: number) {
      this.messengerService
         .setConversationAsConfigured(this.conversation.id)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            () => {
               this.sendAdminMsg(
                  `Buenas noticias, ${
                  this.sharedUserService.getUser().nombre
                  } ha empezado a trabajar en tu caso. La respuesta legal estará lista en ${days} días.`
               )
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(
                     (msg: IMensaje) => {
                        this.conversation.estado = EstadoConv.CasoConfigurado;
                        this.updateStatusResponse();
                        this.conversation.Mensajes.push(msg);
                        scrollDown();
                     },
                     err => {
                        this.displayError(err);
                     }
                  );
            },
            err => {
               this.displayError(err);
            }
         );
   }
   sendAclaration(mensaje: string) {
      var msg: IMensaje = this.conversation.Mensajes.find(m => m.tipo === 1);
      const respuestaLegal: IRespuestaLegal = msg.RespuestaLegal;
      if (respuestaLegal) {
         this.legalResponseService
            .sendAclaracion(respuestaLegal, mensaje, {
               aclaracion: mensaje,
               ConversacionId: this.conversation.id,
               DestinatarioId: this.conversation.destinatario.id
            })
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               (msg: IMensaje) => {
                  this.conversation.Mensajes.push(msg);
                  this.conversation.estado = EstadoConv.Aclaracion;
                  this.updateStatusResponse();
                  scrollDown();
               },
               err => {
                  this.displayError(err);
               }
            );
      } else {
         var toast: ToastOptions = this.toastOptionsClass.toastOptions;
         toast.msg = "Ha habido un error";
         this.toastyService.error(toast);
      }
   }
   sendFile(file: File) {
      var id = new Date().getUTCMilliseconds(); //crea un integer aleatorio
      const i =
         this.conversation.Mensajes.push({
            Conversacion: this.conversation,
            Remitente: this.sharedUserService.getUser(),
            texto: file.name,
            tipo: 10,
            id: id
         }) - 1; //length - 1 é a posicion do item introducido
      this.messengerService
         .sendMsg(
            {
               ConversacionId: this.conversation.id,
               RemitenteId: this.sharedUserService.getUserId(),
               texto: file.name,
               DestinatarioId: this.conversation.destinatario.id,
               nombreRemitente: `${this.sharedUserService.getUser().nombre} ${
                  this.sharedUserService.getUser().apellidos
                     ? this.sharedUserService.getUser().apellidos
                     : ""
                  }`,
               tipo: 10,
               file: file
            },
            id
         )
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (msg: IMensaje) => {
               this.conversation.Mensajes.splice(i, 1);
               this.conversation.Mensajes.push(msg);
               scrollDown();
            },
            err => {
               this.conversation.Mensajes.splice(i, 1);
               this.displayError(err);
            }
         );
   }
   sendTextMsg(msg: string) {
      this.messengerService
         .sendMsg({
            ConversacionId: this.conversation.id,
            RemitenteId: this.sharedUserService.getUserId(),
            texto: msg,
            DestinatarioId: this.conversation.destinatario.id,
            nombreRemitente: `${this.sharedUserService.getUser().nombre} ${
               this.sharedUserService.getUser().apellidos
                  ? this.sharedUserService.getUser().apellidos
                  : ""
               }`,
            tipo: 0
         })
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (msg: IMensaje) => {
               this.conversation.Mensajes.push(msg);
               scrollDown();
            },
            err => {
               this.displayError(err);
            }
         );
   }
   aceptarCaso() {
      this.messengerService.aceptCase(this.conversation.id).subscribe(
         res => {
            this.sendAdminMsg(
               `A ${
               this.sharedUserService.getUser().nombre
               } le ha interesado el caso.`
            )
               .pipe(takeUntil(this.ngUnsubscribe))
               .subscribe(
                  (msg: IMensaje) => {
                     this.conversation.estado = EstadoConv.Aceptada;
                     this.conversation.Mensajes.push(msg);
                     scrollDown();
                     this.updateStatusResponse();
                  },
                  err => {
                     this.displayError(err);
                  }
               );
         },
         err => this.displayError(err)
      );
   }
   updateStatusResponse() {
      const estadoConv = this.conversation.estado;
      const mRespuestaLegale = this.conversation.Mensajes.find(mensaje => mensaje.tipo == 1);
      let respuestaLegale = false;
      this.hidePlaceholder = false;
      if (mRespuestaLegale && mRespuestaLegale.RespuestaLegal && mRespuestaLegale.RespuestaLegal.estado === 'ACEPTADA') {
         respuestaLegale = true;
      }
      if (this.isCustomer && estadoConv == EstadoConv.RespuestaLegal && respuestaLegale) {
         this.placeholderCustomer = "Escribir (max. 240 caracteres)";
      } else if (this.isCustomer && estadoConv == EstadoConv.ConversacionInicial) {
        this.hidePlaceholder = true;
         this.placeholderCustomer = "No puedes enviar más mensajes hasta que el abogado acepte tu consulta.";
      }
      else {
         this.placeholderCustomer = "Escribe...";
      }
      this.blockInputConversation =
         (
            (
               estadoConv == EstadoConv.Rechazada ||
               estadoConv == EstadoConv.ConversacionInicial ||
               estadoConv == EstadoConv.CasoConfigurado ||
               estadoConv == EstadoConv.Pregunta ||
               (estadoConv == EstadoConv.RespuestaLegal && !respuestaLegale) ||
               estadoConv == EstadoConv.Aclaracion
            ) &&
            this.isCustomer
         ) ||
            (
               (
                  estadoConv == EstadoConv.Rechazada ||
                  estadoConv == EstadoConv.ConversacionInicial ||
                  estadoConv == EstadoConv.CasoConfigurado ||
                  estadoConv == EstadoConv.RespuestaLegal ||
                  estadoConv == EstadoConv.Aclaracion
               ) &&
               !this.isCustomer
            )
            ? true
            : false;
   }
   rechazarCaso() {
      this.messengerService.refuseCase(this.conversation.id).subscribe(
         res => {
            this.sendAdminMsg(
               `A ${
               this.sharedUserService.getUser().nombre
               } no le ha interesado el caso. La conversación ha finalizado.`
            )
               .pipe(takeUntil(this.ngUnsubscribe))
               .subscribe(
                  (msg: IMensaje) => {
                     this.conversation.estado = EstadoConv.Rechazada;
                     this.updateStatusResponse();
                     this.conversation.Mensajes.push(msg);
                     scrollDown();
                  },
                  err => {
                     this.displayError(err);
                  }
               );
         },
         err => this.displayError(err)
      );
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
   displayError(err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.title = "Error";
      toast.msg = err;
      this.toastyService.error(toast);
   }
   goProfile() {
      if (this.isCustomer) {
         let plainProfesional = Object.assign(
            {},
            this.conversation.destinatario.Profesional
         );
         plainProfesional.Usuario = this.conversation.destinatario;
         this.router.navigate(
            this.sharedUserService.getProfileUrl(
               null, false, {
                  userName: this.conversation.destinatario.nombre + ' ' +
                     this.conversation.destinatario.apellidos,
                  userId: this.conversation.destinatario.id
               }
            )
         );
      }
   }

   toRedactarRespuestaLegal() {
      let url = ["inbox/respuestalegal/datosfacturacion"];
      this.router.navigate(url, { queryParams: { c: this.conversation.id, d: this.conversation.destinatario.id } });
   }
}

function shouldINotify(conversation: IConversacion, myUserId: number) {
   const mensajes = conversation.Mensajes;
   return (
      !conversation.visto &&
      myUserId != mensajes[mensajes.length - 1].Remitente.id
   );
}
function scrollDown() {
   //HORRIBLE PERO UNICA SOLUCION POR AHORA QUE ENCONTREI
   setTimeout(() => {
      var objDiv = document.getElementById("scrollDiv");
      if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
   }, 400);
}
