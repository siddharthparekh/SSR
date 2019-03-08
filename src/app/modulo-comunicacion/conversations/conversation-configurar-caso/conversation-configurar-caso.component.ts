import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-conversation-configurar-caso',
  templateUrl: './conversation-configurar-caso.component.html',
  styleUrls: ['./conversation-configurar-caso.component.css']
})
export class ConversationConfigurarCasoComponent implements OnInit {

  numeroDias: number = 3;
  @Output() onModalClose = new EventEmitter<void>();
  @Output() onCaseConfigured = new EventEmitter<number>();
  @Input() conversacionId: number;

  constructor() { }

  ngOnInit() {
  }
  aceptar() {
    this.onCaseConfigured.emit(this.numeroDias);
    this.closeModal();
  }
  closeModal() {
    this.onModalClose.emit();
  }
}
