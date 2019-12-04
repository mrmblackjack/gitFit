import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import usersData from 'users.json';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  constructor() { }

  chartData;
  timestamps;

  barplot=false;

  countries;
  years;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            // max : 92,
            // min: 88
          }
      }]
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  plotUsers(users, category){
    this.chartData=[]
    for (let user of users){
      this.chartData.push({data:usersData[user][category]["data"], label: user})
    }
    this.lineChartData=this.chartData;
    let sortedTimestamps = this.getSortedTimestamps(users)
    this.lineChartLabels=this.timestampsToDateStrings(sortedTimestamps);
    this.padData(users, category, sortedTimestamps)
  }

  padData(users, category, sortedTimestamps){
    let padIndeces = [];
    for (let user of users){
      let userData = usersData[user][category]["data"];
      let userTimestamps = usersData[user]["timestamps"];
      padIndeces = [];
      for (let timestamp of userTimestamps){
        padIndeces.push(sortedTimestamps.findIndex(x=>x===timestamp));
      }
      for (let i = 0; i < userData.length; i++) {
        if (!(padIndeces.includes(i))){
          userData.splice(i,0,null);
        }
      }
    }
  }

  getSortedTimestamps(users){
    let concTimestamps=[]
    for (let user of users){
      concTimestamps=concTimestamps.concat(usersData[user]["timestamps"])
    }
    let uniqueSet = new Set(concTimestamps);
    concTimestamps = [...uniqueSet]
    concTimestamps.sort()
    return concTimestamps
  }

  plotBarChart(users){
    let points = []
    for (let user of users){
      points.push(usersData[user]["points"])
    }
    console.log(points)
    this.chartData=[{data:points, label:"Points"}]
    this.barChartData=this.chartData;
    this.barChartLabels = users;
  }

  plot(data,goals,timestamps){
    let min = Math.min(...data)
    let max = Math.max(...data)
    let dateStrings = this.timestampsToDateStrings(timestamps)
    // console.log(dates);
    this.lineChartOptions.scales.yAxes[0].ticks.min = min-2;
    this.lineChartOptions.scales.yAxes[0].ticks.max = max+2;
    this.chartData=[{data:data, label:"Weight"},{data:goals, label:"Weight Goals"}]
    this.lineChartData=this.chartData;
    this.lineChartLabels=dateStrings;
  }

  timestampsToDateStrings(timestamps){
    let dates = timestamps.map(x => new Date(x*1000));
    let dateStrings = dates.map(x => (x.getDate() + "/" + x.getMonth() + "/" + x.getFullYear()));
    return dateStrings
  }

  ngOnInit() {
    // this.plot([90, 89.70, 89.70, 89.50, 89.60], [90, 89.75, 89.50, 89.60, 89.35,89.45], [1572825600, 1573430400, 1574035200, 1574640000, 1575244800, 1575849600]);
      this.plotUsers(["user1", "user2"], "weight")
      // this.plotBarChart(["user1", "user2"])
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
