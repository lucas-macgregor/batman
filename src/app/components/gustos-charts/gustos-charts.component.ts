import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Table } from 'src/app/models/table';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData,  ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-gustos-charts',
  templateUrl: './gustos-charts.component.html',
  styleUrls: ['./gustos-charts.component.css']
})
export class GustosChartsComponent implements OnChanges {

  dataLabels:Array<string>=[];
  dataArrays:Array<Array<number>>=[[]];
  public barChartData!: ChartData<'bar'>;
  public pieChartData!: ChartData<'pie', number[], string | string[]>;

  @Input() gustos:Table[]=[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor() {  }

  ngOnChanges(changes: SimpleChanges):void {
    if (changes.hasOwnProperty('gustos')){
      this.setupBarChartData();
      this.setupPieChartData();
    }
  }
  //----------------------------Grafico de barras-----------------------//
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';

  //----------------------------Grafico Torta-------------------------------//
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  public pieChartType: ChartType = 'pie';

  //----------------------------Metodos utiles------------------------------//
  //public update(): void {
  //  this.setupBarChartData();
  //  this.setupPieChartData();
  //  this.chart?.update();
  //}

  private getLabelArray(array:Table[]):Array<string> {
    let labelArray:Array<string>=[];
    for (let i=0;i<array.length;i++) {
      labelArray.push(array[i].noGusta+'/'+array[i].meGusta);
    }
    return labelArray;
  }

  private getDataArrays(array:Table[]):Array<Array<number>> {
    const dataArrays:Array<Array<number>> = [[]];
    const dataSet1:Array<number>=[];
    const dataSet2:Array<number>=[];
    for (let i=0;i<array.length;i++) {
      dataSet1.push(array[i].noGusta_cont)
    }
    for (let i=0;i<array.length;i++) {
      dataSet2.push(array[i].meGusta_cont);
    }
    dataArrays.push(dataSet1);
    dataArrays.push(dataSet2);
    return dataArrays;
  }

  private setupBarChartData():void {
    this.dataLabels = this.getLabelArray(this.gustos);
    this.dataArrays = this.getDataArrays(this.gustos);
    this.barChartData= {
      labels: this.dataLabels,
      datasets: [
        { data: this.dataArrays[1], label: 'No me gusta' },
        { data: this.dataArrays[2], label: 'Me gusta' }
      ]
    };
  }

  private setupPieChartData():void {
    const pieDataArray:Array<number>=[];
    for (let i=0;i<this.dataArrays[1].length;i++) {
      pieDataArray.push(this.dataArrays[1][i]+this.dataArrays[2][i]);
    }
    this.pieChartData = {
      labels: this.dataLabels,
      datasets: [ {
        data: pieDataArray
      } ]
    };
  }

  public changeOnClick():void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
