import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ProfesionalService } from '../../_services/profesional.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { UserService } from '../../_services/user.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';

@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.css"]
})
export class PaymentInfoComponent implements OnInit {
  errorMsg = "";
  user: any;

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private userService: UserService,
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    if (this.sharedUserService.getUserTipo() == 1) {
      this.user = this.sharedUserService.getUser();
    } else {
      this.profesionalService
        .findFullUserProfile(this.sharedUserService.getUserId())
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  success() {
    var toast: ToastOptions = this.toastOptionsClass.toastOptions;
    toast.title = "COMPLETADO";
    toast.msg = "Datos actualizados";
    this.toastyService.success(toast);
  }

  fail(err) {
    var toast: ToastOptions = this.toastOptionsClass.toastOptions;
    toast.title = "ERROR";
    toast.msg = err;
    this.toastyService.error(toast);
  }
}
