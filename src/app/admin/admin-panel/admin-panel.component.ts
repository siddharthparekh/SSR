import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pago } from '../../_models/Pago';
import { OfficeService } from '../../_services/office.service';
import { ProfesionalService } from '../../_services/profesional.service';
import { SentenceService } from '../../_services/sentence.service';
import { ModalsService } from './../../_services/modals.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"],
  providers: [ProfesionalService, OfficeService, SentenceService]
})
export class AdminPanelComponent implements OnInit {
  modalRef: BsModalRef;
  countRegistrados: number;
  countUsers: number;
  countSentences: number;
  countOffices: number;
  @ViewChild("template")
  template: TemplateRef<any>;
  abogadoId: number;
  pagos: Pago[] = [];
  date1;
  date2;
  pagosClick: number = 0;
  totalPagos: number = 0;
  totalComisiones: number = 0;
  totalCobro: number = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private sharedModalService: ModalsService,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private profesionalService: ProfesionalService,
    private sentenceService: SentenceService,
    private officeService: OfficeService
  ) {
    this.toastyConfig.theme = "default";
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  closeModal() {
    this.modalRef.hide();
    this.sharedModalService.emitClose();
    this.pagosClick = 0;
    this.date1 = undefined;
    this.date2 = undefined;
    this.pagos = [];
  }

  getPagos() {
    this.pagosClick = 1;
    this.profesionalService
      .getPagosRecibidos(
        this.abogadoId,
        new Date(this.date1),
        new Date(this.date2)
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.pagos = res.map(e => {
            return new Pago(e);
          });
          if (this.pagos && this.pagos.length > 0) {
            this.totalPagos = 0;
            this.totalComisiones = 0;
            this.totalCobro = 0;
            for (let pago of this.pagos) {
              this.totalPagos += pago.importeTotal;
              this.totalComisiones += pago.importeBase * 0.2;
              this.totalCobro += pago.importeTotal - pago.importeBase * 0.2;
            }
          }
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
  }

  ngOnInit() {
    this.profesionalService
      .countProfesionales()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.countUsers = res.count;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
    this.profesionalService
      .countRegistrados()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.countRegistrados = res.count;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );

    this.officeService
      .countDespachos()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.countOffices = res.count;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );

    this.sentenceService
      .countSentencias()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.countSentences = res.count;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
    this.route.queryParams.subscribe(params => {
      if (params["abogado"]) {
        this.abogadoId = params["abogado"];
        this.openModal();
      }
    });
    this.sharedModalService
      .onOpen()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.openModal();
      });
    this.sharedModalService
      .onClose()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
  }

  returnDate(date: string) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    return new Date(date).toLocaleDateString("es-ES", options);
  }
}
