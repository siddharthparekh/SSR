import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angular2-social-login';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { IUsuarioStorage } from './../../../_models/UsuarioStorage';
import { CustomerService } from './../../../_services/customer.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

declare var $: any;

@Component({
   selector: "app-register-customer",
   templateUrl: "./register-customer.component.html",
   styleUrls: ["./register-customer.component.css", "../../common.css"],
   providers: [AuthService]
})
export class RegisterCustomerComponent implements OnInit {
   registerForm: FormGroup;
   privacyPolicy = false;
   recibeNews = false;
   reqInProg = false;
   terminos = false;
   terminosRed = false;

   constructor(
      private sharedUserService: SharedUserService,
      private router: Router,
      public _auth: AuthService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private customerService: CustomerService
   ) {
      this.createForm();
   }

   ngOnInit() { }
   createForm() {
      this.registerForm = this.fb.group({
         name: ["", Validators.required],
         email: ["", [Validators.required, Validators.email]],
         password: ["", [Validators.required, Validators.minLength(6)]],
         passwordRepeat: [
            "",
            [duplicatePassword, Validators.required, Validators.minLength(6)]
         ],
         privacidad: [undefined, [Validators.required]],
         noticias: [false, []]
      });
   }
   signIn(provider) {
      if (provider === "google") {
         this._auth.login(provider).subscribe(data => {
            this.customerService.googleAuth(data).subscribe(
               res => {
                  let user: IUsuarioStorage = res.Usuario;
                  this.sharedUserService.setUserInfo(user, res.Usuario.token);
                  this.success();
               },
               err => {
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
               }
            );
         });
      } else if (provider === "facebook") {
         this._auth.login(provider).subscribe(data => {
            this.customerService.facebookAuth(data).subscribe(
               res => {
                  let user: IUsuarioStorage = res.Usuario;
                  this.sharedUserService.setUserInfo(user, res.Usuario.token);
                  this.success();
               },
               err => {
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
               }
            );
         });
      }
   }
   googleAuth() {
      if (this.terminos) this.signIn("google");
      else this.terminosRed = true;
   }

   facebookAuth() {
      if (this.terminos) this.signIn("facebook");
      else this.terminosRed = true;
   }

   authLogin() {
      this.reqInProg = true;
      const formValue = this.registerForm.value;
      if (this.registerForm.valid) {
         var toast: ToastOptions = this.toastOptionsClass.toastOptions;
         this.customerService
            .customerSignUp(
               formValue.name,
               formValue.email,
               formValue.password,
               formValue.privacidad,
               formValue.noticias
            )
            .subscribe(
               res => {
                  this.reqInProg = false;
                  this.success();
               },
               err => {
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
                  this.reqInProg = false;
               }
            );
      } else {
         this.reqInProg = false;
      }
   }
   success() {
      const title = "COMPRUEBE SU CORREO";
      const msg = "Y siga las instrucciones para terminar el registro";
      this.router.navigate(['result', true], {
         relativeTo: this.route,
         queryParams: { msgS: msg, msgTitle: title }
      });
   }

   terminosClick() {
      this.router.navigate(["/info/condiciones"]);
   }

   politicaClick() {
      this.router.navigate(["/info/privacidad"]);
   }

   gmailButtonClicked() {
      // :TODO
      console.log("gmailButtonClicked");
   }
}

function duplicatePassword(input: AbstractControl) {
   const password = input.value;
   const password_confirm = input.root.value.password;
   if (password !== password_confirm) {
      return { mismatchedPassword: true };
   } else {
      return null;
   }
}
