import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import usersData from 'users.json';
import contryAlcohol from 'data.json';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

  constructor() { }

  chartData;
  timestamps;

  users = ["user1","user2","user3"]
  category = "cigarettes";
  country="Bulgaria";
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
    scales: { xAxes: [{}], yAxes: [{
    ticks:{min:0, max:450}
  }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        min: 0,
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
    category = "points"
    this.chartData=[]
    if(!(category==="points")){
      for (let user of users){
        this.chartData.push({data:usersData[user][category]["data"], label: user})
      }
    }

    else{
      this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["max"]=450
      this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["min"]=0
      for (let user of users){
        this.chartData.push({data:usersData[user]["points"], label: user})
      }
    }
    this.lineChartData=this.chartData;
    let sortedTimestamps = this.getSortedTimestamps(users)
    this.lineChartLabels=this.timestampsToDateStrings(sortedTimestamps);

    this.padData(users, category, sortedTimestamps)
  }

  padData(users, category, sortedTimestamps){
    let padIndeces = [];
    let userData=[];
    for (let user of users){
      userData=[];
      // console.log(usersData);
      if(!(category==="points")){
        userData = usersData[user][category]["data"];
      }
      else{
        userData = usersData[user]["points"];
      }
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
      points.push(usersData[user]["points"][points.length])
    }
    console.log(points)
    this.chartData=[{data:points, label:"Points"}]
    this.barChartData=this.chartData;
    this.barChartLabels = users;
  }

  getCountryLatestYearAlcohol(country){
    let new_data={}
    for (let entry of contryAlcohol["fact"]) {
      if (!new_data[entry["dims"]["COUNTRY"]]){
          new_data[entry["dims"]["COUNTRY"]]={"Years":[], "Values":[]}
      }
      if(entry["dims"]["ALCOHOLTYPE"]==="All types"){
        new_data[entry["dims"]["COUNTRY"]]["Years"].push(entry["dims"]["YEAR"])
        new_data[entry["dims"]["COUNTRY"]]["Values"].push(entry["Value"])
      }
    }
    // console.log(country)
    // console.log(new_data[country]);
    return new_data[country]["Values"][0];
  }

  plotUser(user, category, country){
      let data = usersData[user][category]["data"]
      let goals = usersData[user][category]["goals"]
      let timestamps = usersData[user]["timestamps"]
      let dateStrings = this.timestampsToDateStrings(timestamps)
      let countryAlc = []
      if (category==="alcohol" || category==="cigarettes"){
        this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["min"]=0;
      }
      if (country!=false && category==="alcohol"){
        let countryAlcConsumption = this.getCountryLatestYearAlcohol(country)
        countryAlcConsumption=Math.round(countryAlcConsumption*1000*100/1000/52)
        for (let i of timestamps){
          countryAlc.push(countryAlcConsumption)
        }
        this.chartData=[{data:data, label:category},{data:goals, label:category + " goals"},{data:countryAlc, label:country}]
        this.lineChartData=this.chartData;
        this.lineChartLabels=dateStrings;
      }
      else{
        this.chartData=[{data:data, label:category},{data:goals, label:category + " goals"}]
        this.lineChartData=this.chartData;
        this.lineChartLabels=dateStrings;
      }
  }

  timestampsToDateStrings(timestamps){
    let dates = timestamps.map(x => new Date(x*1000));
    let dateStrings = dates.map(x => (x.getDate() + "/" + x.getMonth() + "/" + x.getFullYear()));
    return dateStrings
  }

  ngOnInit() {
    if(this.barplot){
      this.plotBarChart(this.users)
    }
    else{
      if(this.category==="points" || this.users.length > 1){
        this.plotUsers(this.users,this.category)
      }
      else if(this.users.length === 1){
        this.plotUser(this.users[0],this.category, this.country)
      }
    }
    // this.getCountryLatestYearAlcohol("Bulgaria")
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
