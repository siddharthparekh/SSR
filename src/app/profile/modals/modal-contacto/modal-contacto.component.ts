import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { MessengerService } from '../../../_services/messenger.service';
import { Subject } from 'rxjs';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';
import { SharedUserService } from './../../../_services/shared-user.service';
import { Router, ActivatedRoute, NavigationEnd, UrlSerializer, PRIMARY_OUTLET } from '@angular/router';
import { Location } from '@angular/common';

declare var $: any;

@Component({
   selector: 'app-modal-contacto',
   templateUrl: './modal-contacto.component.html',
   styleUrls: ['./modal-contacto.component.css'],
   providers: []
})
export class ModalContactoComponent implements OnDestroy {
   reqInProg: boolean = false;
   texto: string;
   asunto: string;
   @Input() profesionalId: number;
   isCaptchaValid: boolean;
   captchaResponse: string;

   private ngUnsubscribe: Subject<void> = new Subject<void>();

   constructor(private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private router: Router,
      private _urlSerializer: UrlSerializer,
      private route: ActivatedRoute,
      private location: Location,
      private sharedUserService: SharedUserService,
      private messengerService: MessengerService) { }

   closeModal() {
      $('#modal-contacto-abogado').modal('hide');
   }

   send = (): void => {
      this.reqInProg = true;
      this.messengerService.newConversation({
         profesionalId: this.profesionalId,
         asunto: this.asunto,
         texto: this.texto,
         captchaResponse: this.captchaResponse
      }, this.sharedUserService.getUserId()).pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(conv => {
            this.reqInProg = false;
            this.closeModal();
            this.router.navigate(['/inbox', 'conversaciones', conv.id], { relativeTo: this.route });
         }, err => {
            this.closeModal();
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastyService.error(toast);
         })
   }
   resolved(e: any) {
      this.captchaResponse = e;
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
}
