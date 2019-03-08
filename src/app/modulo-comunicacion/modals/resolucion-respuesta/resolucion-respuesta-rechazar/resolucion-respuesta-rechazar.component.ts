import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

import { ToastOptionsClass } from '../../../../_utils/toastOptionsClass';
import { IRespuestaLegal } from './../../../../_models/RespuestaLegal';
import { LegalResponseService } from './../../../../_services/legal-response.service';
import { ModalsService } from './../../../../_services/modals.service';
import { SharedModalResponseService } from './../../../_services/shared-modal-response.service';

@Component({
  selector: "app-resolucion-respuesta-rechazar",
  templateUrl: "./resolucion-respuesta-rechazar.component.html",
  styleUrls: ["./resolucion-respuesta-rechazar.component.css"],
  providers: []
})
export class ResolucionRespuestaRechazarComponent implements OnInit {
  respuestaId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private modalsService: ModalsService,
    private toastyConfig: ToastyConfig,
    private sharedResponseService: SharedModalResponseService,
    private responseService: LegalResponseService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.respuestaId = params["respuestaId"];
    });
  }
  rechazar() {
    this.responseService.refuseResponse(this.respuestaId).subscribe(
      (res: IRespuestaLegal) => {
        this.modalsService.emitClose();
        this.responseService.emitReponseResult(res.estado);
        this.sharedResponseService.emitResolveResponse(
          "La Respuesta Legal se ha rechazado"
        );
      },
      err => {
        var toast: ToastOptions = this.toastOptionsClass.toastOptions;
        toast.msg = err;
        this.toastyService.error(toast);
      }
    );
  }
}
