
import { takeUntil, distinctUntilChanged, tap, debounceTime } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SharedModalResponseService } from './../../_services/shared-modal-response.service'
import { RoutesService } from './../../../_services/routes.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { LegalResponseService } from './../../../_services/legal-response.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { MessengerService } from '../../../_services/messenger.service';
import { IConversacion } from '../../../_models/Conversacion';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';

declare var $: any;

@Component({
   selector: 'app-respuesta-legal-modal-1',
   templateUrl: './respuesta-legal-modal-1.component.html',
   styleUrls: ['./respuesta-legal-modal-1.component.css'],
})
export class RespuestaLegalModal1Component implements OnInit, OnDestroy {

   htmlText: string;
   routeSnapshot: ActivatedRouteSnapshot;
   conversationId: number;
   usuarioId: number;
   onSave$: Subject<any> = new Subject<any>();
   statusMsg: string;
   ngUnsubscribe = new Subject<void>();
   conversation: IConversacion = {} as IConversacion;

   constructor(private sharedService: SharedModalResponseService,
      private route: ActivatedRoute,
      private router: Router,
      private sharedUserService: SharedUserService,
      private legalResponseService: LegalResponseService,
      private routesService: RoutesService,
      private messengerService: MessengerService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private renderer: Renderer2,
   ) {
      $('.main-content').addClass('redaccion');
      this.routeSnapshot = this.route.snapshot;
   }

   ngOnInit() {
      this.conversationId = this.routeSnapshot.queryParams['c'];
      if (this.conversationId) {
         this.fetchAllMsgConversation();
      }
      this.routesService.setBackRoute({ commands: ['inbox', 'conversaciones', this.conversationId], extras: null });
      this.legalResponseService.getDraft(this.conversationId).pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(respuestaLegal => this.htmlText = respuestaLegal.textoBorrador);
      this.onAutoSave();
   }
   setResponse = () => {
      this.sharedService.setHtmlResponse(this.htmlText);
   }
   onAutoSave() {
      this.onSave$.asObservable().pipe(
         takeUntil(this.ngUnsubscribe),
         debounceTime(4000),
         tap(() => this.statusMsg = 'guardando...'),
         debounceTime(2000),
         distinctUntilChanged())
         .subscribe((a: any) => this.saveDraft(a.html));
   }
   saveDraft(text: string) {
      this.legalResponseService.saveDraft(text, this.conversationId).pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(() => {
            this.statusMsg = 'guardado';
            setTimeout(() => this.statusMsg = null, 2000);
         }, err => {
            this.statusMsg = 'error guardando';
            setTimeout(() => this.statusMsg = null, 2000);
         });
   }

   ngOnDestroy() {
      $('.main-content').removeClass('redaccion');
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }

   fetchAllMsgConversation() {
      this.messengerService
         .getAllMessagesConversation(this.conversationId)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            (conv: any) => {
               this.conversation = conv;
               this.conversation.destinatario = this.conversation.Usuarios.find(
                  u => u.id !== this.sharedUserService.getUserId()
               );
            },
            err => {
               this.displayError(err);
            }
         );
   }

   displayError(err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.title = "Error";
      toast.msg = err;
      this.toastyService.error(toast);
   }

   goBack() {
      let urlItem = this.router.url.split("/")
      // Para volver atras desde respuesta legal
      if (this.router.url.includes("respuestas-legales")) {
         let newUrl = urlItem[2] + "/" + urlItem[3];
         this.router.navigate([newUrl], { relativeTo: this.route });
      }
   }

}
