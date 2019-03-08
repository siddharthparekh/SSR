import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Chart } from "chart.js";

import { LineChartItem } from "../../interfaces";

@Component({
  selector: "app-profile-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["../../../styles/legend.css"]
})
export class SpecLineChartComponent implements OnInit {
  @Input() heading: string;
  @Input() items: LineChartItem[];
  @Input() isPercentage = false;
  @Input() individualLabel: string;

  @ViewChild("lineChart") private chartRef;
  chart: any;

  labels: any[] = [];
  globals = [];
  medias = [];

  ngOnInit() {
    this.initDisplayedData();
    this.initChart();
  }

  initDisplayedData() {
    this.items.map(x => {
      this.labels.push(x.year);
      this.globals.push(this.isPercentage ? Math.floor(x.global * 100) : x.global);
      this.medias.push(this.isPercentage ? Math.floor(x.media * 100) : x.media);
    });
  }

  get suggestedMax(): number {
    let max = 0;
    for (const item of this.items) {
      const tmpMax = Math.max(item.global, item.media);
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    return max * 1.1;
  }

  initChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.isPercentage ? this.individualLabel + "(%)" : this.individualLabel,
            data: this.globals,
            borderColor: "#03a2c6",
            pointBackgroundColor: "#03a2c6",
            pointBorderColor: "#03a2c6",
            pointHoverBackgroundColor: "#03a2c6"
          },
          {
            label: this.heading == 'Evolución de resultados' ? "Alcanzable (%)" : "Media",
            data: this.medias,
            borderColor: "#f2b160",
            pointBackgroundColor: "white",
            pointBorderWidth: 3,
            pointHoverBorderWidth: 3
          }
        ]
      },
      options: {
        animation: false,
        elements: {
          line: {
            tension: 0,
            fill: false
          },
          point: {
            radius: 5,
            hoverRadius: 5
          }
        },
        legend: {
          display: false
        },
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: this.suggestedMax,
                callback: value => {
                  return this.isPercentage
                    ? Math.floor(value) + "%"
                    : Math.floor(value * 100) / 100;
                }
              },
              gridLines: {
                drawBorder: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                offset: true,
                display: false
              }
            }
          ]
        }
      }
    });
  }
}
