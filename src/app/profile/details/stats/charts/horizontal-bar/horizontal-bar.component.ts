import { Component, Input, OnInit } from '@angular/core';

declare const jQuery: any;

@Component({
  selector: 'app-profile-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: [
    'horizontal-bar.css',
  ],
})
export class HorizontalBarComponent implements OnInit {
  @Input() value: number;
  @Input() max: number;
  @Input() bold = false;

  progressId: string;
  contentElementId: string;

  ngOnInit() {
    !!this.value || (this.value = 0);
    this.max || (this.max = this.value);

    // inititalizing tooltip
    /*this.setElementsIds().then(() => {
      jQuery(`#${this.progressId}`).tooltip({
        title: () => jQuery(`#${this.contentElementId}`),
      });
    });*/
  }

  generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  setElementsIds(): Promise<void> {
    return new Promise(resolve => {
      const id = this.generateUniqueId();
      this.progressId = `horizontalBarProgress${id}`;
      this.contentElementId = `horizontalBarTooltipContent${id}`;
      resolve();
    });
  }
}
