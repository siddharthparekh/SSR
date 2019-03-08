import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-spec-laurel',
  templateUrl: './laurel.component.html',
  styleUrls: [
    './ranking-laurel.css',
  ],
})
export class LaurelComponent {
  @Input() place: string;
  @Input() text: string;
}
