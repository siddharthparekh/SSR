import { Component, Input, OnInit } from '@angular/core';

import { ClientsData } from '../interfaces';
import { 
  Access, AccessMode, AccessLevel,
} from '../../../interfaces/profile-mode';

declare const $: any;

@Component({
  selector: 'app-profile-stats-clients',
  templateUrl: './clients.component.html',
  styleUrls: [
    '../../../styles/blockable.css',
  ],
})
export class ClientsComponent implements OnInit {
  blocked = false;
  @Input() data: ClientsData;
  @Input() access: Access;

  ngOnInit() {
    const access = this.access;
    if (!!access && access.mode === AccessMode.Directory) {
      if (access.level < AccessLevel.Essential) {
        this.blocked = true;
      }
    }
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specilist-contract-plans")["modal"]("show"),
          200
        );
      }
      if (this.access.mode === AccessMode.Directory) {
        setTimeout(
          () => $("#modal-profile-contract-plans")["modal"]("show"),
          200
        );
      }
    }
  }
}
