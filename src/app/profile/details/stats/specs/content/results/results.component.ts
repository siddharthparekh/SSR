import { Component, Input } from '@angular/core';

import { LineChartItem } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-results',
  templateUrl: './results.component.html',
  styleUrls: [
    '../../../../../styles/blockable.css',
  ],
})
export class ResultsComponent {
  @Input() blocked = false;
  @Input() items: LineChartItem[];
}
