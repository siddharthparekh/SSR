import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastOptions, ToastyConfig, ToastyService } from "ng2-toasty";
import { ToastOptionsClass } from "./../../../_utils/toastOptionsClass";
import { UserService } from "./../../../_services/user.service";

@Component({
  selector: "app-recover-password",
  templateUrl: "./recover-password.component.html",
  styleUrls: ["./recover-password.component.css", "../../common.css"],
  providers: [UserService]
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {
  recoveryPasswordForm: FormGroup;
  reqInProg: boolean = false;
  private s;
  constructor(
    private userService: UserService,
    private router: Router,
    private r: ActivatedRoute,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.recoveryPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  summitForm() {
    if (this.recoveryPasswordForm.valid) {
      this.reqInProg = true;
      this.s = this.userService
        .recoverPassword(this.recoveryPasswordForm.get("email").value)
        .subscribe(
          res => {
            this.reqInProg = false;
            this.router.navigate(["result", "true"], {
              relativeTo: this.r,
              queryParams: {
                msgS: "Siga las instrucciones para cambiar la contraseña",
                msgTitle: "COMPRUEBE SU CORREO"
              }
            });
          },
          err => {
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastyService.error(toast);
            this.reqInProg = false;
          }
        );
    }
  }
  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
  }
}
