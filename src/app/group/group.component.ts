import { Component, OnInit} from '@angular/core';
import usersData from 'users.json';
import { ChartComponent } from '../chart/chart.component';
// import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

  groupName = "Goal masters"
  barChart = true
  groupMembersNames=["user1","user2","user3","user4"]
  // groupMembersNames=["user1","user2","user3"]
  groupMembers=[]

  constructor() { }

  ngOnInit() {
    for(let member of this.groupMembersNames){
      this.groupMembers.push(usersData[member])
    }
    for(let i=0;i<this.groupMembersNames.length;i++){
      this.groupMembers[i]["username"]=this.groupMembersNames[i]
    }
    this.groupMembers = this.groupMembers.sort((x,y)=>y.points[11]-x.points[11])
  }

  toggleWeekly(){
    this.barChart=!this.barChart
  }


}
