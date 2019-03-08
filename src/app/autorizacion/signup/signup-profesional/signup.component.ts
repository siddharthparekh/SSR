import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ProfesionalService } from '../../../_services/profesional.service';
import { SharedUserService } from '../../../_services/shared-user.service';
import { UserService } from '../../../_services/user.service';
import { ToastOptionsClass } from '../../../_utils/toastOptionsClass';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [ProfesionalService]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  reqInProg = false;
  errorMsg = "";
  code: string;
  terminos: boolean = false;
  noticias: boolean = false;
  private s;

  constructor(
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private url: ActivatedRoute
  ) {
    this.createForm();
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.url.queryParams.subscribe(params => {
      this.code = params["code"];
    });
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      password_confirm: [
        "",
        [duplicatePassword, Validators.required, Validators.minLength(6)]
      ]
    });
  }
  onSignUp(value) {
    var toast: ToastOptions = this.toastOptionsClass.toastOptions;
    if (this.signupForm.valid) {
      this.reqInProg = value;
      let objForm = this.signupForm.value;
      objForm.code = this.code;
      objForm.noticias = this.noticias;
      objForm.privacidad = this.terminos;
      this.s = this.userService.signup(objForm).subscribe(
        res => {
          this.reqInProg = false;
          toast.title = "COMPLETADO";
          toast.msg = "Te has registrado con éxito!";
          this.toastyService.success(toast);
          this.userService.login(objForm.email, objForm.password).subscribe(
            result => {
              this.sharedUserService.setUserInfo(result.user, result.token);
              this.reqInProg = false;
              setTimeout(() => this.router.navigate(["/prices"]), 2000);
            },
            err => {
              this.reqInProg = false;
              var toast: ToastOptions = this.toastOptionsClass.toastOptions;
              toast.msg = err;
              this.toastyService.error(toast);
            }
          );
        },
        err => {
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
    }
  }
  setEmtpyPassConfirm() {
    if (this.signupForm.get("password_confirm").touched) {
      this.signupForm.patchValue({ password_confirm: "" });
    }
  }
  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
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
