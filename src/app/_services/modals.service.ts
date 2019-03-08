import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalsService {

  dataAux: any;

  private onCloseEmitter: EventEmitter<void> = new EventEmitter<void>();
  private onOpenEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  emitClose() {
    this.onCloseEmitter.emit();
  }
  onClose() {
    return this.onCloseEmitter;
  }
  setDataAux(data: any) {
    this.dataAux = data;
  }
  getDataAux(): any {
    return this.dataAux;
  }
  onOpen() {
    return this.onOpenEmitter;
  }
  emitOpen() {
    this.onOpenEmitter.emit();
  }

}
