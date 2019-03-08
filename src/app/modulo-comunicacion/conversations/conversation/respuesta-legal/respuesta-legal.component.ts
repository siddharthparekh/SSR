
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { IRespuestaLegal, EstadoRespuesta } from './../../../../_models/RespuestaLegal';
import { SharedUserService } from './../../../../_services/shared-user.service';
import { IConversacion } from './../../../../_models/Conversacion';
import { LegalResponseService } from './../../../../_services/legal-response.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedModalResponseService } from './../../../_services/shared-modal-response.service';

declare var $: any;

@Component({
  selector: 'app-respuesta-legal',
  templateUrl: './respuesta-legal.component.html',
  styleUrls: ['./respuesta-legal.component.css']
})
export class RespuestaLegalComponent implements OnInit, OnDestroy, OnChanges {

  @Input() respuesta: IRespuestaLegal;
  @Input() conversacion: IConversacion;
  isCustomer: boolean = true;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute,
    private sharedUserService: SharedUserService,
    private responseSharedService: SharedModalResponseService,
    private legalResponseservice: LegalResponseService) {
  }

  ngOnInit() {
    this.isCustomer = this.sharedUserService.getUser().tipo == 1 ? true : false;
    this.legalResponseservice.resultadoRespuestaLegal$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(estado => {
        this.respuesta.estado = estado as EstadoRespuesta;
      });
  }
  ngOnChanges() {
    if (this.respuesta) {
      this.respuesta.Categoria.nombre = this.respuesta.Categoria.nombre.replace('_', ' ');
      this.responseSharedService.setResponseClient(this.respuesta);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
