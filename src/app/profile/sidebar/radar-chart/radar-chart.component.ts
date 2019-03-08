import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DataChartsService } from '../../../_services/data-charts.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
  providers: [DataChartsService]
})
export class RadarChartComponent implements OnInit, OnChanges {
  public radarChartLabels: string[];
  public options;
  public radarChartData: any;
  public radarChartType: string;
  public radarChartColors = [
    {
      backgroundColor: ['#36516C', '#173332', '#471665', '#FF8A3D', '#5C8BB9', '#18898B', '#101820', '#25A2A4']
    }
  ];
  @Input() type: any;
  @Input() graphId: number;
  @Input() user: any;
  @Input() data: any;
  @Output() onClick = new EventEmitter<number>();

  constructor(private dataChartsService: DataChartsService) { }

  ngOnInit() {
    this.radarChartLabels = this.data.radarChartLabels;
    this.options = this.type.options;
    this.radarChartData = this.data.radarChartData;
    this.radarChartType = this.type.radarChartType;
  }
  ngOnChanges() {
    this.radarChartLabels = this.data.radarChartLabels;
    this.options = this.type.options;
    setTimeout(() => { this.radarChartData = this.data.radarChartData }, 0);
    this.radarChartType = this.type.radarChartType;
  }

  chartClicked(e: any, id: number): number {
    if (e.active[0] !== undefined) {
      id = e.active[0]._index;
    } else {
      id = 0;
    }
    this.onClick.emit(id);
    return id;
  }

}
