import { Component, Input, OnInit } from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-profile-compare-bars',
  templateUrl: './compare-bars.component.html',
  styleUrls: [
    './compare-bars.styles.css',
  ],
})
export class CompareBarsComponent implements OnInit {
  @Input() boldValue = 0;
  @Input() normalValue = 0;
  @Input() max: number;

  boldWrapperId: string;
  contentElementId: string;

  ngOnInit() {
    this.max || (this.max = Math.max(this.boldValue, this.normalValue));

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

  get differencePercent(): number {
    if (this.boldValue === 0 && this.normalValue === 0) {
      return 0;
    } else if (this.boldValue === 0) {
      return -100;
    } else if (this.normalValue === 0) {
      return 100;
    } else {
      return Math.round(100 * (this.boldValue - this.normalValue) / this.normalValue);
    }
  }
}
