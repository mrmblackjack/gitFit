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
  category="weight"
  diary;
  goal

  ngOnInit() {
    console.log(this.user);
    this.avbarService.changeNavbarVis(true);
    this.avbarService.name.subscribe(name => this.username = name);

    this.recService.currentMessage.subscribe(user => this.user = user);
    this.goalService.currentGoalObj.subscribe(goal => this.goal = goal);
    this.getUpdatedUserService.new.subscribe(diary => this.diary = diary);
    console.log(this.user)
  }

  setCatWeight(){
    this.category="weight"
    console.log(1)
  }

  setCatAlc(){
    this.category="alcohol"
    console.log(2)
  }
  setCatCig(){
    this.category="cigarettes"
    console.log(3)
  }

  log(){
    console.log(this.user)
    console.log(this.goal)
    console.log(this.diary)
  }


}
