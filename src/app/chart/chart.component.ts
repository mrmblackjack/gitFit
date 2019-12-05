import { Component, OnInit, ViewChild, Input  } from '@angular/core';
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

  @Input() users// = ["user1","user2","user3"]
  @Input() category = "alcohol";
  @Input() country="Bulgaria";
  @Input() barplot=false;
  @Input() goal;
  @Input() diary;

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
      console.log(users)
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
      points.push(usersData[user]["points"][usersData[user]["points"].length-1])
    }
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

  plotUserObject(user,goal, diary, category){
    console.log(user)
    console.log(goal)
    let goalDataWeight=[user.weight,goal.bmiGoal]
    let goalDataAlc = [user.alcCons,goal.alcConsGoal]
    let goalDataCig = [user.cigUse,goal.cigGoal]

    let dataWeight = goalDataWeight.slice(0,1)
    let dataAlc = goalDataAlc.slice(0,1)
    let dataCig = goalDataCig.slice(0,1)
    if(diary!=false){
      dataWeight.push(diary["weight"])
      dataAlc.push(diary["alcohol"])
      dataCig.push(diary["cigarettes"])
    }
    console.log(dataWeight);
    if(category==="weight"){
      this.chartData=[{data:dataWeight, label:category},{data:goalDataWeight, label:category + " goals"}]
    }
    else if(category==="alcohol"){
      this.chartData=[{data:dataAlc, label:category},{data:goalDataAlc, label:category + " goals"}]
      // this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["max"]=450
      this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["min"]=0
    }
    else if(category==="cigarettes"){
      this.chartData=[{data:dataCig, label:category},{data:goalDataCig, label:category + " goals"}]
      // this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["max"]=450
      this.lineChartOptions["scales"]["yAxes"][0]["ticks"]["min"]=0
    }

    this.lineChartData=this.chartData;
    this.lineChartLabels=["12/05/2019","12/05/2019"];

  }

  timestampsToDateStrings(timestamps){
    let dates = timestamps.map(x => new Date(x*1000));
    let dateStrings = dates.map(x => (x.getDate() + "/" + x.getMonth() + "/" + x.getFullYear()));
    return dateStrings
  }

  init(){
    console.log(typeof this.users)
    if (this.users!="none"){
      console.log(this.users)
      if(this.barplot){
        this.plotBarChart(this.users)
      }
      else if(typeof this.users === typeof {}){
        // console.log("correct");
        this.plotUserObject(this.users, this.goal, this.diary, this.category)
      }
      else{
        if(this.category==="points" || this.users.length > 1){
          this.plotUsers(this.users,this.category)
        }
        else if(this.users.length === 1){
          this.plotUser(this.users[0],this.category, this.country)
        }
      }
    }
  }

  ngOnChanges() {
    console.log("chart change")
    this.init()
  }

  ngOnInit() {
    this.init()
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
