import { SignInserviceService } from './../sign-inservice.service';
import { RecommendationService } from './../recommendationService.service';
import { GoalService } from './../goal.service';
import { GetUpdatedUserService } from './../get-updated-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private avbarService:SignInserviceService,
      private recService:RecommendationService,
      private goalService:GoalService,
      private getUpdatedUserService:GetUpdatedUserService) {}

  username = "User 1";
  user;
  obj;
  category="weight"
  diary;
  goal
  countrySelect=false;
  dropdown
  countries=["Bulg","USA","UK"]
  shouldShowNavbar = false;
  country="Bulgaria"

  ngOnInit() {
    console.log(this.user);
    this.avbarService.changeNavbarVis(true);
    this.avbarService.name.subscribe(name => this.username = name);

    this.recService.currentMessage.subscribe(user => this.user = user);
    this.goalService.currentGoalObj.subscribe(goal => this.goal = goal);
    this.getUpdatedUserService.new.subscribe(diary => this.diary = diary);

    if (this.user!="none"){
      this.obj=true;
    }
    else{
      this.user=[this.username]
    }

    console.log(this.user)
  }

  setCatWeight(){
    this.category="weight"
    this.countrySelect=false;
  }

  setCatAlc(){
    this.category="alcohol"
    this.countrySelect=true;
  }
  setCatCig(){
    this.category="cigarettes"
    this.countrySelect=false;
  }
  selectAfg(){
    this.country="Afghanistan"
  }

  selectPol(){
    this.country="Poland"
  }

  selectBG(){
    this.country="Bulgaria"
  }
  selectRus(){
    this.country="Russian Federation"
  }
  selectUK(){
    this.country="United Kingdom of Great Britain and Northern Ireland"
  }
  selectUSA(){
    this.country="United States of America"
  }

  hehe(asd){
    console.log(asd)
  }

  log(){
    console.log(this.user)
    console.log(this.goal)
    console.log(this.diary)
  }
}
