import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-profile-clients-donut',
  templateUrl: './clients-donut.component.html',
})
export class ClientsDonutComponent implements OnInit {
  @ViewChild('donutChart') private chartRef;
  chart: any;

  @Input() heading: string;
  @Input() individual: number;
  @Input() company: number;

  ngOnInit() {
    let tooltipsEnabled: boolean;
    let chartData: number[];
    if (this.individual === 0 && this.company === 0) {
      chartData = [0, 0, 1];
      tooltipsEnabled = false;
    } else {
      chartData = [this.individual, this.company];
      tooltipsEnabled = true;
    }
    const _this = this;
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Personas físicas', 'Personas jurídicas'],
        datasets: [{
          data: chartData,
          backgroundColor: [
            '#00447b',
            '#03a2c6',
          ],
          borderColor: [
            '#00447b',
            '#03a2c6',
          ]
        }]
      },
      options: {
        animation: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: tooltipsEnabled,
          bodyFontSize: 9,
          callbacks: {
            label: function (tooltipItem, data) {
              var label = 'P. ' + data.labels[tooltipItem.index].split(' ')[1] || '';

              if (label) {
                label += ': ';
              }
              label += _this.getPercentage(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
              return label;
            }
          }
        },
      }
    });
  }

  getPercentage(amount) {
    console.log();
    if (amount !== undefined && amount !== null) {
      const res = (amount / (this.individual + this.company)) * 100;
      if (isNaN(res)) {
        return '0.0%';
      }
      return `${res.toFixed(1)}%`;
    }
    return '0.0%';
  }
}
