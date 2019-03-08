import { Component, Input, OnInit } from '@angular/core';

import { LawArea } from '../interfaces';
import { 
  Access, AccessMode, AccessLevel,
} from '../../../interfaces/profile-mode';
import { testLawAreas } from '../test-data';
import { capitalize } from '../../../utils/capitalize';

declare const jQuery: any;
declare const $: any;

@Component({
  selector: 'app-profile-stats-law-areas',
  templateUrl: './law-areas.component.html',
  styleUrls: [
    '../../../styles/blockable.css',
    '../styles/legend.css',
  ],
})
export class LawAreasComponent implements OnInit {
  blocked = false;
  @Input() areas: LawArea[];
  @Input() access: Access;

  ngOnInit() {
    const access = this.access;
    if (!!access && access.mode === AccessMode.Directory) {
      if (access.level < AccessLevel.Essential) {
        this.areas = testLawAreas;
        this.blocked = true;
      }
    }
    this.initTooltip();
  }

  initTooltip() {
    setTimeout(() => {
      jQuery('#mediaCasesLegend').tooltip({
        title: () => jQuery('#mediaCasesLegendTooltipContent'),
      });
    }, 1000);
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specialist-contract-plans")["modal"]("show"),
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

  get globalMaximum(): number {
    let max = 0;
    for (const area of this.areas) {
      if (area.solutions > max) {
        max = area.solutions;
      }
      const convMedia = area.media;
      if (convMedia > max) {
        max = convMedia;
      }
    }
    return max;
  }

  capit(str: string): string {
    return capitalize(str);
  }
}
