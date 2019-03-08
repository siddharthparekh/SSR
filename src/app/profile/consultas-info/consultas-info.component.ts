import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';

import { ProfesionalService } from '../../_services/profesional.service';
import { ProvinciasService } from '../../_services/provincias.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { UserService } from '../../_services/user.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';

@Component({
  selector: "app-consultas-info",
  templateUrl: "./consultas-info.component.html",
  styleUrls: ["./consultas-info.component.css"]
})
export class ConsultasInfoComponent implements OnInit {
  errorMsg = "";
  user: any;
  submitPreciosConsultas: Subject<void> = new Subject<void>();

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private userService: UserService,
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService,
    private provinciasService: ProvinciasService
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

  onUpdatePrecios(error) {
    if (!error) this.success();
    else this.fail(error);
  }
}
