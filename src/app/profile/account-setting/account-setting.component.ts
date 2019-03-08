import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { LegalResponseService } from './../../_services/legal-response.service';
import { ProfesionalService } from './../../_services/profesional.service';
import { ProvinciasService } from './../../_services/provincias.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { UserService } from './../../_services/user.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

declare var $: any;

@Component({
  selector: "app-account-setting",
  templateUrl: "./account-setting.component.html",
  styleUrls: ["./account-setting.component.css"],
  providers: [
    ProvinciasService,
    ProfesionalService,
    UserService,
    LegalResponseService
  ]
})
export class AccountSettingComponent implements OnInit {
  user: any;
  isCollapsed = true;
  menuLink = "Datos personales";

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService
  ) {
    this.toastyConfig.theme = "default";
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

  hideMenu() {
    this.isCollapsed = false;
  }

  test = () => {
    debugger;
  };
}
