import { Component, OnInit } from '@angular/core';
import { ModalsService } from './../../../_services/modals.service';

@Component({
  selector: 'app-modal-explicacion',
  templateUrl: './modal-explicacion.component.html',
  styleUrls: ['./modal-explicacion.component.css']
})
export class ModalExplicacionComponent implements OnInit {

  constructor(private modalService: ModalsService, ) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalService.emitClose();
  }

}
