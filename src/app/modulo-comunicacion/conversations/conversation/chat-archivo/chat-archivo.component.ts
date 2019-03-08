import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ToastOptionsClass } from '../../../../_utils/toastOptionsClass';
import { IConversacion } from './../../../../_models/Conversacion';
import { IMensaje } from './../../../../_models/Mensaje';
import { MessengerService } from './../../../../_services/messenger.service';

@Component({
  selector: "app-chat-archivo",
  templateUrl: "./chat-archivo.component.html",
  styleUrls: ["./chat-archivo.component.css"]
})
export class ChatArchivoComponent implements OnInit, OnDestroy {
  @Input() conversacion: IConversacion;
  @Input() mensaje: IMensaje;
  @Input() positionRight: boolean;
  @Input() uploadInfo: { progress: number; msgId: number };
  private s: any;

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private messengerService: MessengerService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {}
  downloadFile() {
    console.log('click me')
    this.s = this.messengerService
      .downloadFile(this.conversacion.id, this.mensaje.id)
      .subscribe(
        data => {
          FileSaver.saveAs(data, this.mensaje.texto);
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = "No se pudo descargar el archivo";
          this.toastyService.error(toast);
        }
      );
  }
  ngOnDestroy() {
    if (this.s) this.s.unsubscribe();
  }
}
