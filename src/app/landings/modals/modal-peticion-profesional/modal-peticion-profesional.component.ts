import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ModalsService } from './../../../_services/modals.service';
import { UserService } from './../../../_services/user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

@Component({
  selector: "app-modal-peticion-profesional",
  templateUrl: "./modal-peticion-profesional.component.html",
  styleUrls: ["./modal-peticion-profesional.component.css"],
  providers: [UserService]
})
export class ModalPeticionProfesionalComponent implements OnInit {
  email: string;
  colegio: string;
  nColegiado: string;
  reqInProg: boolean = false;
  terminos: boolean = false;

  constructor(
    private userService: UserService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private modalService: ModalsService,
    private _router: Router
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}
  send(value) {
    this.reqInProg = value;
    const texto =
      "El abogado con Número de colegiado " +
      this.nColegiado +
      " perteneciente al colegio " +
      this.colegio +
      " desea unirse a la red.\nPara contactar con el: " +
      this.email;
    this.userService
      .contact({
        email: this.email,
        asunto: "PETICIÓN PARA UNIRSE A LA RED",
        texto: texto
      })
      .subscribe(
        res => {
          this.reqInProg = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.title = "OK";
          toast.msg = "Enviado con éxito";
          this.toastyService.success(toast);
        },
        err => {
          this.reqInProg = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
  }

  terminosClick() {
    this.modalService.emitClose();
    this._router.navigate(["/info/condiciones"]);
  }

  politicaClick() {
    this.modalService.emitClose();
    this._router.navigate(["/info/privacidad"]);
  }
}
