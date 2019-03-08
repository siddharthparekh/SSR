import { Component, Input } from '@angular/core';

import { LineChartItem } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-evolution-cases',
  templateUrl: './evolution-cases.component.html',
  styleUrls: [
    '../../../../../styles/blockable.css',
  ],
})
export class EvolutionCasesComponent {
  @Input() blocked = false;
  @Input() items: LineChartItem[];
}
