import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blocking-complex',
  templateUrl: './blocking-complex.component.html',
})
export class BlockingComplexComponent {
  @Input() hint: string = "El profesional no ha hecho visibles estas estadísticas";
  @Output() buyProfile = new EventEmitter<void>();

  _buyProfile() {
    this.buyProfile.next();
  }
}
