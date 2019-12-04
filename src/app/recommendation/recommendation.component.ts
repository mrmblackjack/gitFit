import { constants } from './../../assets/constants';
import { RecommendationService } from './../recommendationService.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  constructor(private recService: RecommendationService) { }
  user = null;

  BMI = 0;
  bmiString = '';
  bmiGoals = [];

  alcCons = 0;
  alcConsString = '';
  alcConsGoals = [];

  cigUse = 0;
  cigUseString = '';
  cigUseGoals = [];

  doStuff() {
    this.processAlcCons();
    this.processBMI();
    this.processCigUse();
  }

  processBMI() {
    this.BMI = this.user.weight / (this.user.height / 100) ** 2;
    if (this.BMI < constants.BMI.NORMAL_LOWER_LIMIT) {
        this.bmiString = 'You are underweight! Eat some Kettle ;).';
    } else if (this.BMI < constants.BMI.OVERWEIGHT_LOWER_LIMIT) {
      this.bmiString = 'Yer fine.';
    } else if (this.BMI < constants.BMI.OBESE_LOWER_LIMIT) {
      this.bmiString = 'Lose some weight.';
    } else {
      this.bmiString = 'Damn ya fat.';
    }
  }

  processAlcCons() {
    this.alcCons = this.user.alcCons;
    if (this.alcCons < constants.ALCOHOL.WEEKLY_UNIT_MAX_LIMIT) {
      this.alcConsString = 'Your alcohol consumption is within the recommended limit.';
      //
    } else {
      this.alcConsString = 'Your alcohol consumption is over the recommended limit.';
      //
    }
  }

  processCigUse() {
    this.cigUse = this.user.cigUse;
    if (this.cigUse >= constants.CIGARETTES.UNHEALTHY_LOWER_LIMIT) {
      this.cigUseString = 'You smoke, STAHP.';
      // try to reduce by 5 %, if 5% < 1, then reduce by 1. Until you stop.
    } else {
      this.cigUseString = 'GOOD BOI.';
      // Keep at it.
    }
  }



  ngOnInit() {
    this.recService.currentMessage.subscribe(user => this.user = user);
    this.doStuff();
  }

}
