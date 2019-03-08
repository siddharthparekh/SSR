import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';

import { ProfesionalService } from '../../_services/profesional.service';
import { ProvinciasService } from '../../_services/provincias.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { UserService } from '../../_services/user.service';
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';

@Component({
  selector: "app-billing-info",
  templateUrl: "./billing-info.component.html",
  styleUrls: ["./billing-info.component.css"],
  providers: [UserService, ProvinciasService]
})
export class BillingInfoComponent implements OnInit {
  reqInProg = false;
  errorMsg = "";
  editing = [];
  provincias: Array<Select2OptionData> = [];
  provinciaIdInicialFacturacion: string;
  user: any;
  submitDatosFacturacion: Subject<void> = new Subject<void>();

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private userService: UserService,
    private profesionalService: ProfesionalService,
    private sharedUserService: SharedUserService,
    private provinciasService: ProvinciasService,
    private fb: FormBuilder
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
          this.provincias = this.provinciasService.getProvincias();
          let provinciaSelect2 = this.provinciasService.getProvinciaByName(
            user.Estadisticas.provincia
          );
          if (provinciaSelect2)
            this.provinciaIdInicialFacturacion = provinciaSelect2.id;
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

  onFacturacion() {
    this.submitDatosFacturacion.next();
  }

  updateFacturacion(e) {
    if (e) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.msg = e;
      this.toastyService.error(toast);
    } else {
      this.editing["section2"] = false;
      this.success();
    }
  }
}
