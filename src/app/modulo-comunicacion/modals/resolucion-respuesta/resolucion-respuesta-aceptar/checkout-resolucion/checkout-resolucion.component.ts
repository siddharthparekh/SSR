import { Component, OnInit } from '@angular/core';
import { SharedModalResponseService } from './../../../../_services/shared-modal-response.service';
import { Router } from '@angular/router';
import { ModalsService } from './../../../../../_services/modals.service';

@Component({
  selector: 'app-checkout-resolucion',
  templateUrl: './checkout-resolucion.component.html',
  styleUrls: ['./checkout-resolucion.component.css']
})
export class CheckoutResolucionComponent implements OnInit {

  constructor(
    private responseSharedService: SharedModalResponseService,
    private router: Router,
    private modalsService: ModalsService
  ) { }

  ngOnInit() {
  }
  irARespuesta() {
    this.modalsService.emitClose();
    const respuesta = this.responseSharedService.getResponseClient();
    this.router.navigate(['inbox', 'respuestas-legales', 'aceptadas', respuesta.id]);
  }

}
