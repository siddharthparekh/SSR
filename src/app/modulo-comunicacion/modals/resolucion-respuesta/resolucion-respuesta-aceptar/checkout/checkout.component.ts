import { Component, OnDestroy, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IRespuestaLegal } from './../../../../../_models/RespuestaLegal';
import { IUsuario } from './../../../../../_models/Usuario';
import { LegalResponseService } from './../../../../../_services/legal-response.service';
import { PaymentsService } from './../../../../../_services/payments.service';
import { SharedUserService } from './../../../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../../../_utils/toastOptionsClass';
import { SharedModalResponseService } from './../../../../_services/shared-modal-response.service';
import { formatNumber } from '@angular/common';

declare var $: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  modalmode = 'billing';
  respuesta: IRespuestaLegal;
  tiposPago = [];
  importeTotal: number;
  tipoPagoSeleccionado: any;
  reqInProg = false;
  ngUnsubscribe = new Subject<void>();
  payment_type = {};
  loading = false;
  user: any;
  editing: boolean = false;
  isValidFacturacion = true;
  datosFacturacion: any = {};
  card_id: string = null;
  submitDatosFacturacion: Subject<void> = new Subject<void>();

  constructor(
    private responseSharedService: SharedModalResponseService,
    private paymentsService: PaymentsService,
    private responseService: LegalResponseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private sharedUserService: SharedUserService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {

    this.respuesta = this.responseSharedService.getResponseClient();
    this.calcularTipoPagos();
    if (this.sharedUserService.getUserTipo() == 1) {
      this.user = this.sharedUserService.getUser();
    }
  }
  // calcularImporteTotal(precioRespuesta = 0, retencion = 0) {
  //   return precioRespuesta + (precioRespuesta * 0.21) + retencion;
  // }
  // onTipoPagoChange() {
  //   this.importeTotal = this.calcularImporteTotal(this.respuesta.precio, this.tipoPagoSeleccionado.retencion);
  // }
  calcularTipoPagos() {
    this.paymentsService
      .calcularImporte(this.respuesta.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.tiposPago = res;
        },
        err => {
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
        }
      );
  }
  goToFacturacion() {
    // this.router.navigate(["../facturacion"], { relativeTo: this.route });
  }
  pagar(value) {
    this.reqInProg = value;
    if (this.reqInProg) {
      this.paymentsService
        .newChargeRespuestas({
          // card_id: this.responseSharedService.getPaymentInfo().id,
          card_id: this.card_id,
          respuestaId: this.respuesta.id,
          emisorEsEntidad: this.tipoPagoSeleccionado.id == 0 ? true : false
        })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          r => {
            this.responseService.emitReponseResult("ACEPTADA");
            this.responseSharedService.emitResolveResponse(
              "Si necesitas una aclaración sobre la respuesta legal puedes enviarle un último mensaje al abogado."
            );
            this.reqInProg = false;
            this.router.navigate(["../", "success"], { relativeTo: this.route });
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

  success() {
    var toast: ToastOptions = this.toastOptionsClass.toastOptions;
    toast.title = "COMPLETADO";
    toast.msg = "Datos actualizados";
    this.toastyService.success(toast);
  }

  updateFacturacion(e) {
    console.log('updateFacturacion');
    console.log('datosFacturacion', this.datosFacturacion);
    console.log('tipoPagoSeleccionado.datosFacturacion', this.tipoPagoSeleccionado.datosFacturacion);
    if (e) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.msg = e;
      this.toastyService.error(toast);
    } else {
      this.editing = false;
      this.success();
    }
  }

  showBilling() {
    $('.normal-text.card-title').text('Respuesta legal');
    this.modalmode = 'billing';
  }

  showCheckout() {
    $('.normal-text.card-title').text('Resumen de pago');
    this.modalmode = 'checkout';
  }

  onIsValidFacturacion(e) {
    this.isValidFacturacion = e;
    console.log('isValidFacturacion', this.isValidFacturacion);
  }

  invoiceData(data) {
    this.datosFacturacion = data;
  }

  onFacturacion() {
    console.log('onFacturacion');
    console.log('datosFacturacion', this.datosFacturacion);
    console.log('tipoPagoSeleccionado.datosFacturacion', this.tipoPagoSeleccionado.datosFacturacion);
    // this.tipoPagoSeleccionado.datosFacturacion = this.datosFacturacion;
    this.submitDatosFacturacion.next();
    // this.editing = false;
  }

  formatCardNumberForBackend(cardnumber: string): string {
    if (!cardnumber) return undefined;
    return cardnumber.replace(/ /g, '');
  }
  formatAmount(amount: number): string {
    return `PAGAR ${formatNumber(amount, this.locale, '1.2-2')} €`;
  }

  formatAmount2(amount: string): string {
    return `PAGAR ${amount} €`;
  }

  validate() {
    return false;
  }

  changeCard(event: any) {
    this.card_id = event;
  }

  payment() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
function existeRetencionEntidad(usuario: IUsuario): boolean {
  if (
    !(usuario && usuario.DatosFacturaciones && usuario.DatosFacturaciones.nif)
  )
    return undefined;
  const nif = usuario.DatosFacturaciones.nif;
  const esFacturarConIRPF = usuario.DatosFacturaciones.tieneIRPF;
  const primerCaracter = nif.substring(0, 1).toLowerCase();
  const ultimoCaracter = nif
    .substring(nif.length - 1, nif.length)
    .toLowerCase();
  //si es autonomo
  if (!isNaN(primerCaracter as any) && isLetter(ultimoCaracter)) {
    return true;
  }
  //si es sociedad o otra entidad
  else if (isLetter(primerCaracter)) {
    if (primerCaracter === "j" && esFacturarConIRPF) return true;
    else return false;
  }
}

function isLetter(caracter: string): boolean {
  caracter = caracter.toLowerCase();
  return caracter.length === 1 && caracter.match(/[a-z]/i) ? true : false;
}
function toCentimos(amountInEuro: number) {
  return amountInEuro * 100;
}
