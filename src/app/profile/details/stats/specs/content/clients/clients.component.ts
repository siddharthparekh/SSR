import { Component, Input } from '@angular/core';
import { SpecClientsData } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-clients',
  templateUrl: './clients.component.html',
  styleUrls: [
    '../../../../../styles/blockable.css',
  ],
})
export class ClientsComponent {
  @Input() blocked = false;

  @Input() data: SpecClientsData;
}
