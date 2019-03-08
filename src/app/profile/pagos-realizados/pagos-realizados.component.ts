import { Component, OnDestroy, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { PaginationInstance } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentsService } from '../../_services/payments.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { IPago } from './../../_models/Pago';

@Component({
   selector: "app-pagos-realizados",
   templateUrl: "./pagos-realizados.component.html",
   styleUrls: ["./pagos-realizados.component.css"]
})
export class PagosRealizadosComponent implements OnInit, OnDestroy {
   user: any;
   isCustomer: boolean;
   charges: IPago[] = [];
   gastos: IPago[] = [];
   ingresos: IPago[] = [];
   reqInProg = false;
   reqInProgGastos = false;
   reqInProgIngresos = false;
   fondos_acumulados = "150,72";
   tabFacturas = 0;
   pagesDisplay = 6;
   ngUnsubscribe = new Subject<void>();

   public config: PaginationInstance = {
      id: "custom",
      itemsPerPage: 5,
      currentPage: 1
   };

   public configGastos: PaginationInstance = {
      id: "customGastos",
      itemsPerPage: 5,
      currentPage: 1
   };

   public configIngresos: PaginationInstance = {
      id: "customIngresos",
      itemsPerPage: 5,
      currentPage: 1
   };

   constructor(
      private paymentsService: PaymentsService,
      private sharedUserService: SharedUserService
   ) { }

   ngOnInit() {
      this.user = this.sharedUserService.getUser();
      if (!this.user) return;
      this.isCustomer = this.user.tipo === 1 ? true : false;
      this.reqInProg = true;
      this.paymentsService
         .getAllCharges(this.user.id)
         .pipe(takeUntil(this.ngUnsubscribe))
         .subscribe(
            res => {
               this.reqInProg = false;
               for (let i = 0; i < res.length; i++) {
                  this.charges.push(res[i]);
                  if (!this.isCustomer && res[i].Receptor.id) this.addFacturaEmerita(res[i]);
               }
            },
            err => {
               this.reqInProg = false;
            }
         );
   }
   addFacturaEmerita(charge: IPago) {
      const duplicatedCharge = Object.assign({}, charge);
      duplicatedCharge.facturaEmerita = true;
      this.charges.push(duplicatedCharge);
   }
   convertToPdf(html: string) {
      html2pdf(html, {
         margin: 0,
         filename: "factura.pdf",
         image: { type: "jpeg", quality: 0.98 },
         html2canvas: { dpi: 192, letterRendering: true },
         jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      });
   }
   descargarFactura(chargeId: number) {
      const indexArrayPago = chargeId + ((this.config.currentPage - 1) * 5);
      const charge: IPago = this.charges[indexArrayPago];
      if (!charge) throw new Error("pago no encontrado");

      // factura ABOGADO-CLIENTE
      if (charge.facturaEmerita || this.isCustomer)
         this.paymentsService
            .getFacturaRespuestaLegalByPago(charge.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
               this.convertToPdf(res.facturaHtml);
            },
               err => console.log(err)
            );
      //factura EMERITA-USUARIO
      else
         this.paymentsService
            .getFacturaByPago(charge.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
               this.convertToPdf(res.facturaHtml);
            },
               err => console.log(err)
            );
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }
}