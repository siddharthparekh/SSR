import { Component, Input } from '@angular/core';

import { RankingData } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-ranking',
  templateUrl: './spec-ranking.component.html',
  styleUrls: [
    '../../../../../styles/blockable.css',
  ]
})
export class SpecRankingComponent {
  @Input() blocked = false;
  active = 0;
  antiguedad: string;

  @Input() data: RankingData;


  ngOnInit() {
    this.antiguedad = this.initXpLevel(this.data.antiguedad);
  }

  private initXpLevel(antiguedad) {
    if (antiguedad <= 5) {
      return "Junior";
    } else if (antiguedad <= 10) {
      return "Intermediate";
    } else if (antiguedad <= 15) {
      return "Advanced";
    } else {
      return "Senior";
    }
  }
}
