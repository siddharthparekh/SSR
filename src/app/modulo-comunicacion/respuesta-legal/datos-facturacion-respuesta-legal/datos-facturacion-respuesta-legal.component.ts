import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { IUsuarioStorage } from './../../../_models/UsuarioStorage';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
   selector: 'app-datos-facturacion-respuesta-legal',
   templateUrl: './datos-facturacion-respuesta-legal.component.html',
   styleUrls: ['./datos-facturacion-respuesta-legal.component.css']
})
export class DatosFacturacionRespuestaLegalComponent implements OnInit {
   user: IUsuarioStorage;
   emitSubmit = new Subject<void>();
   reqInProg = false;
   invalidForm = true;
   invoiceType: any = { "type": "empresa" };


   constructor(
      private router: Router,
      private route: ActivatedRoute
   ) { }

   ngOnInit() {
   }
   submitForm() {
      this.emitSubmit.next();
      this.reqInProg = true;
   }
   changeFormValidity(isValid) {
      this.invalidForm = !isValid;
   }
   onRequestFinish(err) {
      this.reqInProg = false;
      if (err) {
         console.log(err);
      } else {
         this.router.navigate(["../respuesta"], { relativeTo: this.route, queryParamsHandling: 'merge' });
      }
   }

}
