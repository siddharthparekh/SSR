import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ModalsService } from './../../../_services/modals.service';
import { ProfesionalService } from './../../../_services/profesional.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { UserService } from './../../../_services/user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

@Component({
  selector: "app-signup-lawyer-b",
  templateUrl: "./signup-lawyer-b.component.html",
  styleUrls: ["./signup-lawyer-b.component.css"]
})
export class SignupLawyerBComponent implements OnInit {
  signupForm: FormGroup;
  reqInProg = false;
  errorMsg = "";
  code: string;
  terminos: boolean = false;
  private s;

  constructor(
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService,
    private modalService: ModalsService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private userService: UserService,
    private _router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.createForm();
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}

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
      objForm.idSolr = this.modalService.getDataAux().idSolr;
      this.s = this.userService.signUpLawyerB(objForm).subscribe(
        res => {
          this.reqInProg = false;
          this._router.navigate(["../../", "success"], {
            relativeTo: this.route
          });
        },
        err => {
          this.reqInProg = false;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
    }
  }
  closeModal() {
    this.modalService.emitClose();
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
