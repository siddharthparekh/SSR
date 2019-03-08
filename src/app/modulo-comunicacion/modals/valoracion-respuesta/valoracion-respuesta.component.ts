import { Component, Input, OnInit } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { LegalResponseService } from './../../../_services/legal-response.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

declare var $: any;

@Component({
  selector: "app-valoracion-respuesta",
  templateUrl: "./valoracion-respuesta.component.html",
  styleUrls: ["./valoracion-respuesta.component.css"]
})
export class ValoracionRespuestaComponent implements OnInit {
  @Input() respuestaId: number;
  opinion: string;
  reqInProg: boolean = false;

  constructor(
    private responseService: LegalResponseService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}

  setOpinion(value) {
    if (this.opinion && this.opinion.length > 0)
    this.reqInProg = value;
      this.responseService
        .rateLawyerWithResponse(this.respuestaId, { opinion: this.opinion })
        .subscribe(
          () => {
            $("#modal-valoracion").modal("hide");
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "OK";
            toast.msg = "Valoración envíada con éxito";
            this.toastyService.success(toast);
            this.reqInProg = false;
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
