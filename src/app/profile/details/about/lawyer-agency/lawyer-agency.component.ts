import { Component, Input } from '@angular/core';

import { LawyerAgency } from '../interfaces';

@Component({
  selector: 'app-profile-lawyer-agency',
  templateUrl: './lawyer-agency.component.html',
})
export class LawyerAgencyComponent {
  @Input() data: LawyerAgency;

  onLinkClick($event) {
    $event.preventDefault();
  }
}
