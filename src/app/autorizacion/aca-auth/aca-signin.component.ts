import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { IUsuarioStorage } from './../../_models/UsuarioStorage';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
   selector: 'app-aca-signin',
   template: `
  `,
   styles: [`
    `]
})
export class AcaSigninComponent implements OnInit {

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private userService: UserService,
      private sharedUserService: SharedUserService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
   ) { }

   ngOnInit() {
      const object = this.route.snapshot.queryParams;
      this.userService.signInCert(object).subscribe(resp => {
         this.sharedUserService.setUserInfo(resp.profesional as IUsuarioStorage, resp.token);
         this.router.navigate(['/'], { relativeTo: this.route });
      }, err => {
         var toast: ToastOptions = this.toastOptionsClass.toastOptions
         toast.msg = err
         this.toastyService.error(toast)
      });
   }
}
