import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-respuesta-legal-parent',
  templateUrl: './respuesta-legal-parent.component.html',
  styleUrls: ['./respuesta-legal-parent.component.css']
})
export class RespuestaLegalParentComponent implements OnInit {

  @Input() id: number;

  constructor() {
  }

  ngOnInit() {

  }

}
