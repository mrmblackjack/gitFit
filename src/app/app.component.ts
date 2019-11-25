// import { ChartsModule } from 'ng2-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import SampleJson from 'data.json';
// import * as ChartAnnotation from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'GitFit';
  chartData;
  countries;
  years;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor() {

  }

  ngOnInit() {
    // console.log(SampleJson);
    let data = SampleJson
    let new_data={}
    console.log(data);
    for (let entry of SampleJson["fact"]) {
      if (!new_data[entry["dims"]["COUNTRY"]]){
        new_data[entry["dims"]["COUNTRY"]]={"Years":[], "Values":[]}
      }
      if(entry["dims"]["ALCOHOLTYPE"]==="All types"){
        new_data[entry["dims"]["COUNTRY"]]["Years"].push(entry["dims"]["YEAR"])
        new_data[entry["dims"]["COUNTRY"]]["Values"].push(entry["Value"])
      }
    }
    console.log(new_data);
    this.countries=Object.keys(new_data);
    this.chartData=[]
    for (let country of this.countries) {
      let chartEntry={"data": new_data[country]["Values"].reverse().map(function(item) {return parseFloat(item);}), "label": country}
      this.chartData.push(chartEntry)
    }
    this.years = new_data["Albania"]["Years"].reverse();
    this.lineChartData=this.chartData.slice(0,10)
    this.lineChartLabels=this.years;
  }

  public randomize(): void {
    console.log(this.lineChartData);
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     this.lineChartData[i].data[j] = this.generateNumber(i);
    //   }
    // }
    // this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
