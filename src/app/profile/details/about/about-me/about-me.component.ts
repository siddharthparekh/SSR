import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ToastOptionsClass } from '../../../../_utils/toastOptionsClass';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ProfesionalService } from '../../../../_services/profesional.service';
import { SharedUserService } from '../../../../_services/shared-user.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-profile-about-me',
   templateUrl: './about-me.component.html',
})
export class AboutMeComponent implements OnDestroy, OnInit {
   reqInProg = false;
   @Input() aboutMeText: string;
   @Input() itIsMe: boolean
   original: string;
   s: Subscription;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private profesionalService: ProfesionalService,
      private sharedUserService: SharedUserService
   ) {

   }

   ngOnInit() {
      this.original = this.aboutMeText;
      console.log(this.original);
   }
   editPresentationText() {
      this.reqInProg = true;
      if (this.aboutMeText == "") {
         this.aboutMeText = null;
      }
      this.s = this.profesionalService
         .updatePresentationText(this.aboutMeText)
         .subscribe(() => {
            let user = this.sharedUserService.getUser();
            user.presentation_text = this.aboutMeText;
            this.original = this.aboutMeText;
            this.sharedUserService.setUsuario(user);
            this.reqInProg = false;
            //@ts-ignore
            $("#presentation-text").modal("hide");
         }, err => {
            this.reqInProg = false;
            //@ts-ignore
            $("#presentation-text").modal("hide");
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastyService.error(toast);
         });
   }
   ngOnDestroy() {
      this.s && this.s.unsubscribe();
   }
}
