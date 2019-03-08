import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import { GlobalEvolutionItem } from '../interfaces';
import { 
  Access, AccessMode, AccessLevel,
} from '../../../interfaces/profile-mode';

declare const $: any;

@Component({
  selector: 'app-profile-stats-global-evolution',
  templateUrl: './global-evolution.component.html',
  styleUrls: [
    '../../../styles/blockable.css',
    '../styles/legend.css',
  ],
})
export class GlobalEvolutionComponent implements OnInit {
  blocked = false;
  @Input() items: GlobalEvolutionItem[];
  @Input() access: Access;

  @ViewChild('globalEvolutionChart') private chartRef;
  chart: any;

  ngOnInit() {
    this.initBlocked();
    this.initChart();
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specilist-contract-plans")["modal"]("show"),
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

  private initBlocked() {
    const access = this.access;
    if (!!access && access.mode === AccessMode.Directory) {
      if (access.level < AccessLevel.Essential) {
        this.blocked = true;
      }
    }
  }

  get resultsAxisSuggestedMax(): number|null {
    let max = 0;
    for (const item of this.items) {
      if (item.results > max) {
        max = item.results;
      }
    }
    return (max !== 0) ? (max * 1.1) : null;
  }

  initChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.items.map(x => x.year),
        datasets: [
          {
            label: 'Tasa de éxito (%)',
            data: this.items.map(x => Math.floor(x.results*100)),
            type: 'line',
            tension: 0,
            fill: false,
            borderColor: '#03a2c6',
            pointBackgroundColor: 'white',
            pointBorderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 5,
            yAxisID: 'yAxisRight',
          },
          {
            label: 'Número de casos',
            data:  this.items.map(x => x.cases),
            backgroundColor: [
              '#f27760',
              '#f27760',
              '#f27760',
              '#f27760',
              '#f27760',
            ],
            borderColor: [
              '#f27760',
              '#f27760',
              '#f27760',
              '#f27760',
              '#f27760',
            ],
            borderWidth: 1,
            yAxisID: 'yAxisLeft',
          },
        ],
      },
      options: {
        animation: false,
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barThickness: 30,
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: '#607d8b',
            },
          }],
          yAxes: [
            {
              id: 'yAxisLeft',
              gridLines: {
                display: false,
              },
              position: 'left',
              ticks: {
                fontColor: '#607d8b',
                beginAtZero: true,
                suggestedMax: (this.items.length === 0) ? 10 : null,
              },
              type: 'linear',
            },
            {
              id: 'yAxisRight',
              gridLines: {
                display: false,
              },
              position: 'right',
              ticks: {
                fontColor: '#607d8b',
                beginAtZero: true,
                suggestedMax: this.resultsAxisSuggestedMax,
                callback: function(value) {
                  return Math.floor(value) + '%';
                },
              },
              type: 'linear',
            },
          ],
        },
        tooltips: {
          enabled: true,
        },
      },
    });
  }
}
