import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { LegalResponseService } from './../../../_services/legal-response.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

@Component({
  selector: "app-aclaracion",
  templateUrl: "./aclaracion.component.html",
  styleUrls: ["./aclaracion.component.css"]
})
export class AclaracionComponent implements OnInit {
  @Input() respuestaId: number;
  @Input() respuesta: any;
  @Output() responseAclaracionEmitter: EventEmitter<string> = new EventEmitter<
    string
  >();
  textoAclaracion: string = "";

  constructor(
    private responseService: LegalResponseService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}
  sendAclaracion() {
    this.responseService
      .sendAclaracion(this.respuesta, this.textoAclaracion)
      .subscribe(
        () => {
          this.responseAclaracionEmitter.emit(this.textoAclaracion);
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.title = "OK";
          toast.msg = "Aclaración enviada";
          this.toastyService.success(toast);
        },
        err => {
          this.responseAclaracionEmitter.emit(this.textoAclaracion);
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
  }
}
