import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-profile-success-rate-donut',
  templateUrl: './success-rate-donut.component.html',
  styleUrls: [
    './success-rate-donut.component.css',
    '../../styles/legend.css',
  ],
})
export class SuccessRateDonutComponent implements OnInit {
  @ViewChild('successRateChart') private chartRef;
  chart: any;

  @Input() value: number;
  @Input() mediaValue: number;

  @Input() valueLabel: string;
  @Input() valueColor: string;

  valueBgColor: string;

  ngOnInit() {
    this.initColor();
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [this.value, (100 - this.value)],
            backgroundColor: [
              this.valueBgColor,
            ],
            borderColor: [
              'white',
            ],
            borderWidth: 2,
          },
          {
            data: [this.mediaValue, (100 - this.mediaValue)],
            backgroundColor: [
              '#f2b160',
            ],
            borderColor: [
              'white',
            ],
            borderWidth: 2,
          },
        ]
      },
      options: {
        animation: false,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
        },
      }
    });
  }

  initColor() {
    switch(this.valueColor) {
      case 'red': {
        this.valueBgColor = '#f27760';
        break;
      }
      case 'blue': {
        this.valueBgColor = '#03a2c6';
        break;
      }
      case 'indigo': {
        this.valueBgColor = '#00447b';
        break;
      }
      default: {
        this.valueBgColor = 'lightgray';
      }
    }
  }
}
