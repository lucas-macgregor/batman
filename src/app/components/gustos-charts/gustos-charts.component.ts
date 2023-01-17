import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gustos-charts',
  templateUrl: './gustos-charts.component.html',
  styleUrls: ['./gustos-charts.component.css']
})
export class GustosChartsComponent implements OnInit {

  dataLabels:Array<string>=[]

  constructor() {  }

  ngOnInit(): void {

  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() gustos:Table[]=[];
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [ this.dataLabels[0], '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'No me gusta' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Me gusta' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];
    this.chart?.update();
  }

  private getLabelArray(array:Table[]):Array<string> {
    let labelArray:Array<string>=[];
    for (let i=0;i<array.length;i++) {
      labelArray.push(array[i].noGusta+'/'+array[i].meGusta);
    }
    return labelArray;
  }

}
