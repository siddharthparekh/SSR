import { Component, Input } from '@angular/core';
import { SubjectsDataItem } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: [
    './subjects.component.css',
    '../../../../../styles/blockable.css',
  ],
})
export class SubjectsComponent {
  @Input() blocked = false;
  @Input() items: SubjectsDataItem[];
}
