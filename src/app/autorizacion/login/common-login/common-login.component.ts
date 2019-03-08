import { takeUntil } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from './../../../_services/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ToastyService, ToastOptions } from 'ng2-toasty'
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass'
import { SharedUserService } from './../../../_services/shared-user.service'
import { ProfesionalService } from './../../../_services/profesional.service'
import { Subject } from 'rxjs'
import { LegalResponseService } from './../../../_services/legal-response.service'
import { MetaFrontService } from './../../../_services/meta-front.service'
import { IProfesional } from './../../../_models/Profesional'
import { UserType } from '../model-login/user-type'
import { AuthService } from 'angular2-social-login';
import { CustomerService } from '../../../_services/customer.service';
import { decode } from '@angular/router/src/url_tree';

@Component({
   selector: 'app-common-login',
   templateUrl: './common-login.component.html',
   styleUrls: ['./common-login.component.css', '../../common.css'],
   providers: [
      UserService,
      ProfesionalService,
      LegalResponseService,
      MetaFrontService,
      AuthService
   ],
})
export class CommonLoginComponent implements OnInit {
   loginForm: FormGroup

   errorMsg = ''
   rememberMe = false
   ngUnsubscribe: Subject<void> = new Subject<void>()
   userType: UserType = UserType.Usuario
   userTypes = UserType;
   reqInProg = false;
   urlRedirect: string;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private userService: UserService,
      private _auth: AuthService,
      private router: Router,
      private _route: ActivatedRoute,
      private sharedUserService: SharedUserService,
      private profesionalService: ProfesionalService,
      private legalResponseService: LegalResponseService,
      private metaFrontService: MetaFrontService,
      private customerService: CustomerService,
      private fb: FormBuilder
   ) {
      this.createForm();
   }

   ngOnInit() {
      if (this.isRemembered()) {
         this.rememberMe = true
         const c = JSON.parse(localStorage.getItem('credenciales'))
         this.loginForm.patchValue(c)
      }
      this.urlRedirect = this._route.snapshot.queryParams.redirect;
   }

   toggleRememberMe(e) {
      this.rememberMe = e.target.checked
   }

   createForm() {
      this.loginForm = this.fb.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required],
      })
   }

   login() {
      if (this.loginForm.valid) {
         this.reqInProg = true;
         if (this.rememberMe) {
            this.saveToLocalStorage(
               this.loginForm.get('email').value,
               this.loginForm.get('password').value
            )
         } else {
            this.forgetMe()
         }
         this.userService
            .login(
               this.loginForm.get('email').value,
               this.loginForm.get('password').value
            )
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
               result => {
                  this.sharedUserService.setUserInfo(
                     result.user,
                     result.token
                  );
                  this.reqInProg = false;
                  console.log()
                  if (result.user.tipo == UserType.Abogado) this.goProfile(result.user);
                  else this.redirectAfterLogin();
               },
               err => {
                  this.reqInProg = false;
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions
                  toast.msg = err
                  this.toastyService.error(toast)
               }
            )
      }
   }

   goProfile(user: IProfesional) {
      this.legalResponseService
         .getCategoriasRespuestasProf()
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            categorias => {
               if (categorias.length === 0 && (user.MetaFront && !user.MetaFront.skipTarifas)) {
                  this.redirectAfterLogin("/prices", { t: 0 });
               } else {
                  this.redirectAfterLogin();
               }
            },
            err => {
               var toast: ToastOptions = this.toastOptionsClass.toastOptions
               toast.msg = err
               this.toastyService.error(toast)
            }
         )
   }

   private redirectAfterLogin(url?: string, queryParams?: any) {
      if (this.urlRedirect) {
         this.router.navigate([decodeURI(this.urlRedirect)]);
      }
      else {
         if (url) this.router.navigate([url], { queryParams });
         else this.router.navigate(["/"]);
      }
   }


   isRemembered() {
      return localStorage.getItem('credenciales') ? true : false
   }

   ngOnDestroy() {
      this.ngUnsubscribe.next()
      this.ngUnsubscribe.complete()
   }

   private saveToLocalStorage(email, password) {
      localStorage.setItem(
         'credenciales',
         JSON.stringify({
            email: email,
            password: password,
         })
      )
   }

   private forgetMe() {
      localStorage.removeItem('credenciales')
   }

   certificateButtonClicked() {
      window.location.href = '/aca_auth?login=true';
   }

   gmailButtonClicked() {
      this._auth.login('google').subscribe(
         (data) => {
            this.customerService.googleAuth(data).subscribe((res) => {
               let user = res.Usuario;
               this.sharedUserService.setUserInfo(user, res.Usuario.token);
               this.redirectAfterLogin();
            }, err => {
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.msg = err;
               this.toastyService.error(toast);
            })
         }
      );
   }
}
