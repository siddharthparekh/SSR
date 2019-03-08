import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { SharedUserService } from './../../../../_services/shared-user.service';
import { UserService } from './../../../../_services/user.service';
import { ToastOptionsClass } from './../../../../_utils/toastOptionsClass';

declare var $: any;

@Component({
  selector: "app-contacto-colegio",
  templateUrl: "./contacto-colegio.component.html",
  styleUrls: ["./contacto-colegio.component.css"]
})
export class ContactoColegioComponent implements OnInit {
  texto: string;
  reqInProg: boolean;
  errorMsg: string;

  constructor(
    private userService: UserService,
    private sharedUserService: SharedUserService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}
  send(value) {
    this.reqInProg = value;
    this.errorMsg = "";
    this.userService
      .sendSuggestion(
        "<<CAMBIO COLEGIO>>\n" + this.texto,
        this.sharedUserService.getUserId()
      )
      .subscribe(
        resp => {
          $("#modal-modificar-abogacia").modal("hide");
          this.reqInProg = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = "Solicitud enviada con éxito";
          toast.title = "OK!";
          this.toastyService.success(toast);
        },
        err => {
          this.errorMsg = "No se pudo enviar la Solicitud de Cambio";
          this.reqInProg = false;
        }
      );
  }
}
