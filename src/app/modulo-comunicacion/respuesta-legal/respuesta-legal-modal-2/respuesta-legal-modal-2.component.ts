import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ICategoria } from './../../../_models/RespuestaLegal';
import { LegalResponseService } from './../../../_services/legal-response.service';
import { MessengerService } from './../../../_services/messenger.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';
import { SharedModalResponseService } from './../../_services/shared-modal-response.service';

declare var $: any;

@Component({
  selector: "app-respuesta-legal-modal-2",
  templateUrl: "./respuesta-legal-modal-2.component.html",
  styleUrls: ["./respuesta-legal-modal-2.component.css"],
  providers: []
})
export class RespuestaLegalModal2Component implements OnInit, OnDestroy {
  tarifaId: number;
  categoriasRespuesta: ICategoria[] = [];
  routeSnapshot: ActivatedRouteSnapshot;
  conversationId: number;
  destinatarioId: number;
  ngUnsubscribe = new Subject<void>();
  reqInProg = false;

  constructor(
    private sharedService: SharedModalResponseService,
    private sharedUserService: SharedUserService,
    private messengerService: MessengerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private toastOptionsClass: ToastOptionsClass,
    private legalResponseService: LegalResponseService,
    private renderer: Renderer2,
  ) {
    this.toastyConfig.theme = "default";
    this.routeSnapshot = this.route.snapshot;
  }

  ngOnInit() {
    this.conversationId = this.routeSnapshot.queryParams["c"];
    this.destinatarioId = this.routeSnapshot.queryParams["d"];
    if (
      this.sharedService.getHtmlResponse() == undefined ||
      this.sharedService.getHtmlResponse() == null
    ) {
      this.router.navigate(["../respuesta"], {
        queryParamsHandling: "merge",
        relativeTo: this.route
      });
    }
    this.legalResponseService
      .getCategoriasRespuestasProf(this.conversationId)
      .subscribe(
        categorias => {
          categorias = categorias.map(c => {
            c.nombre = c.nombre.replace("_", " ");
            return c;
          });
          this.categoriasRespuesta = categorias;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
    //por si está guardado en el servico ( si se fuea  otra pagina)
    const categoriaId = this.sharedService.getCategoria();
    if (categoriaId != undefined || categoriaId != null) {
      this.tarifaId = categoriaId;
    }
  }
  sendResponse = () => {
    this.reqInProg = true;
    if (this.tarifaId) this.sharedService.setCategoria(this.tarifaId);
    const rp = this.sharedService.getResponse();
    const mensaje = {
      ConversacionId: this.conversationId,
      RemitenteId: this.sharedUserService.getUserId(),
      texto: this.sharedService.getResponse().htmlResponse,
      DestinatarioId: this.destinatarioId,
      nombreRemitente:
        this.sharedUserService.getUser().nombre +
        " " +
        this.sharedUserService.getUser().apellidos,
      tipo: 1,
      RespuestaLegal: rp
    };
    this.messengerService
      .sendMsg(mensaje, 1)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => {
          this.cleanResponseOnService();
          this.reqInProg = false;
          this.router.navigate(
            ["../../", "conversaciones", this.conversationId],
            { relativeTo: this.route }
          );
        },
        err => {
          this.reqInProg = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
  };
  cleanResponseOnService() {
    this.sharedService.setCategoria(undefined);
    this.sharedService.setPresupuesto(undefined);
  }
  ngOnDestroy() {
    // $("footer").css("display", "block");
  }
}
