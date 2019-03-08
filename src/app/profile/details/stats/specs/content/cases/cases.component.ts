import { Component, Input, OnInit } from '@angular/core';
import { CasesData } from '../../interfaces';

declare const jQuery: any;

@Component({
  selector: 'app-profile-spec-cases',
  templateUrl: './cases.component.html',
  styleUrls: [
    './cases.component.css',
    '../../../../../styles/blockable.css',
  ],
})
export class CasesComponent implements OnInit {
  @Input() blocked = false;
  @Input() data: CasesData;

  boldWrapperId: string;
  contentElementId: string;

  ngOnInit() {
    // inititalizing tooltip
    this.setElementsIds().then(() => {
      jQuery(`#${this.boldWrapperId}`).tooltip({
        title: () => jQuery(`#${this.contentElementId}`).html(),
      });
    });
  }

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  setElementsIds(): Promise<void> {
    return new Promise(resolve => {
      const id = this.generateUniqueId();
      this.boldWrapperId = `boldWrapper${id}`;
      this.contentElementId = `compareBarsTooltipContent${id}`;
      resolve();
    });
  }

  get maximum() {
    const a = this.data.analyzed;
    const m = this.data.media;
    return (a > m) ? a : m;
  }

  get differencePercent(): number {
    if (this.data.analyzed === 0 && this.data.media === 0) {
      return 0;
    } else if (this.data.analyzed === 0) {
      return -100;
    } else if (this.data.media === 0) {
      return 100;
    } else {
      return Math.round(100 * (this.data.analyzed - this.data.media) / this.data.media);
    }
  }
}
