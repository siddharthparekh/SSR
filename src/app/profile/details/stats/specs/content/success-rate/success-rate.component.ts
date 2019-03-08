import { Component, Input, OnInit } from '@angular/core';
import { SuccessRateData } from '../../interfaces';

@Component({
  selector: 'app-profile-spec-success-rate',
  templateUrl: './success-rate.component.html',
  styleUrls: [
    '../../../../../styles/blockable.css',
  ],
})
export class SuccessRateComponent implements OnInit {
  @Input() blocked = false;
  @Input() data: SuccessRateData;

  displayData: SuccessRateData;

  ngOnInit() {
    this.displayData = {
      simple: {
        value: this.transformValue(this.data.simple.value),
        mediaValue: this.transformValue(this.data.simple.mediaValue),
      },
      company: {
        value: this.transformValue(this.data.company.value),
        mediaValue: this.transformValue(this.data.company.mediaValue),
      },
      individual: {
        value: this.transformValue(this.data.individual.value),
        mediaValue: this.transformValue(this.data.individual.mediaValue),
      },
    }
  }

  transformValue(rawValue: number): number {
    return rawValue * 100;
  }
}
