
import {takeUntil} from 'rxjs/operators';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalsService } from './../../../../_services/modals.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resolucion-respuesta-parent',
  templateUrl: './resolucion-respuesta-parent.component.html',
  styleUrls: ['./resolucion-respuesta-parent.component.css']
})
export class ResolucionRespuestaParentComponent implements OnInit, AfterViewInit, OnDestroy {

  modalRef: BsModalRef;
  @ViewChild('template') template: ModalDirective;
  ngUnsubscribe = new Subject<void>();

  constructor(private modalsService: ModalsService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.openModal();
  }
  ngAfterViewInit() {
    this.handleModal();
  }
  openModal() {
    this.modalRef = this.modalService.show(this.template, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-vcentrado'
    });
  }
  handleModal() {
    this.modalService.onHide.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
    this.modalsService.onOpen().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (!this.modalRef)
          this.openModal();
      });
    this.modalsService.onClose().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.modalRef)
          this.close();
      })
  }
  close() {
    this.modalRef.hide();
  }
  ngOnDestroy() {
    if (this.modalRef) this.modalRef.hide();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
