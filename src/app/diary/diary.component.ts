import { GetUpdatedUserService } from './../get-updated-user.service';
import { SignInserviceService } from './../sign-inservice.service';
import { Component, OnInit } from '@angular/core';
import users from '../users.json';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.sass']
})
export class DiaryComponent implements OnInit {

  constructor(private navbarService: SignInserviceService  ,private updateService:GetUpdatedUserService) {}
  username = "user1";
  user_data = users[this.username];
  weight: number;
  alcohol_unit: number;
  cigarette_use: number;
  weight_goal;
  alcohol_goal;
  cigarettes_goal;
  points=0;
  goal_achieved1=false;
  goal_achieved2=false;
  goal_achieved3=false;
  diary_filled=false;


  calculate(){
    console.log(this.user_data);
    this.weight_goal = this.user_data["weight"]["goals"][this.user_data["weight"]["goals"].length-1]
    this.alcohol_goal = this.user_data["alcohol"]["goals"][this.user_data["alcohol"]["goals"].length-1]
    this.cigarettes_goal = this.user_data["cigarettes"]["goals"][this.user_data["cigarettes"]["goals"].length-1]
    console.log(this.weight_goal);
    console.log(this.weight_goal*1.25);
      if(this.weight>this.weight_goal*1.25){
        console.log('not achieved be mamamuuuuuuuu')
      }
      if(this.weight>=this.weight_goal && this.weight<=this.weight_goal*1.25){
        this.points+=50;
      }
      if(this.weight<=this.weight_goal && this.weight>this.weight_goal*0.75){
        this.points+=100;
      }
      if(this.weight<=this.weight_goal*0.75){
        this.points+=150;
      }
      if(this.alcohol_unit>this.alcohol_goal){
        console.log('not achieved be mamamuuuuuuuu')
      }
      if(this.alcohol_unit<=this.alcohol_goal && this.alcohol_unit!=0){
        this.points+=100;
      }
      if(this.alcohol_unit==0  && this.alcohol_goal!=0){
        this.points+=150;
      }
      if(this.cigarette_use>this.cigarettes_goal ){
        this.points+=0;
      }
      if(this.cigarette_use<=this.cigarettes_goal && this.cigarette_use!=0){
        this.points+=100;
        }
      if(this.cigarette_use==0  && this.alcohol_goal!=0 ){
        this.points+=150;
      }

    this.user_data["points"].push(this.points);
    console.log(this.user_data);
    this.diary_filled=true;
    
  


  }


  onSubmit(){
    this.calculate();
    this.updateService.changeUserData(this.user_data);
    console.log(this.updateService.new);




  }

  ngOnInit(){
    this.navbarService.changeNavbarVis(true);


  }
}
