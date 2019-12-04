import { constants } from './../../assets/constants';
import { RecommendationService } from './../recommendationService.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.sass']
})
export class RecommendationComponent implements OnInit {

  constructor(private recService: RecommendationService) {}

  user = null;

  goalsObj = {
    bmiGoal: 0,
    alcConsGoal: 0,
    cigUseGoal : 0
  };

  BMI = 0;
  bmiString = '';
  bmiGoal = 0;

  bmiPlus025 = false;
  bmiPlus05 = false;
  bmiKeep = false;
  bmiMinus025 = false;
  bmiMinus05 = false;

  alcCons = 0;
  alcConsString = '';
  alcConsGoal = 0;

  alcConsKeep0 = false;
  alcConsKeepUnder14 = false;
  alcConsReduce5 = false;
  alcConsReduce10 = false;

  cigUse = 0;
  cigUseString = '';
  cigUseGoal = 0;

  cigUseReduce5 = false;
  cigUseReduce10 = false;
  cigUseKeep0 = false;

  underweight = false;
  normalweight = false;
  overweight = false;
  obese = false;

  normalDrinker = false;
  heavyDrinker = false;

  nonSmoker = false;
  smoker = false;


  setBmiGoal() {
    if (this.bmiKeep){
      this.bmiGoal = this.user.weight;
    } else if (this.bmiPlus025) {
      this.bmiGoal = this.user.weight + 0.25;
    } else if (this.bmiPlus05) {
      this.bmiGoal = this.user.weight + 0.5;
    } else if (this.bmiMinus025) {
      this.bmiGoal = this.user.weight - 0.25;
    } else if (this.bmiMinus05) {
      this.bmiGoal = this.user.weight - 0.5;
    }
  }

  setAlcConsGoal() {
    if (this.alcConsKeep0) {
      this.alcConsGoal = 0;
    } else if (this.alcConsKeepUnder14) {
      this.alcConsGoal = 14;
    } else if (this.alcConsReduce5) {
      this.alcConsGoal = this.user.alcCons - (this.user.alcCons * 0.05);
    } else if (this.alcConsReduce10) {
      this.alcConsGoal = this.user.alcCons - (this.user.alcCons * 0.1);
    }
  }

  setCigGoal() {
    if (this.cigUseKeep0) {
      this.alcConsGoal = 0;
    } else if (this.cigUseReduce5) {
      this.alcConsGoal = this.user.cigUse - (this.user.cigUse * 0.05);
    } else if (this.cigUseReduce10) {
      this.alcConsGoal = this.user.cigUse - (this.user.cigUse * 0.1);
    }
  }

  setGoals() {
    this.setBmiGoal();
    this.setAlcConsGoal();
    this.setCigGoal();
  }



  doStuff() {
    this.processAlcCons();
    this.processBMI();
    this.processCigUse();
  }

  processBMI() {
    this.BMI = this.user.weight / (this.user.height / 100) ** 2;

    this.underweight = this.BMI < constants.BMI.NORMAL_LOWER_LIMIT;
    this.normalweight = this.BMI > constants.BMI.NORMAL_LOWER_LIMIT && this.BMI < constants.BMI.OVERWEIGHT_LOWER_LIMIT;
    this.overweight = this.BMI > constants.BMI.OVERWEIGHT_LOWER_LIMIT && this.BMI < constants.BMI.OBESE_LOWER_LIMIT;
    this.obese = this.BMI > constants.BMI.OBESE_LOWER_LIMIT;

    if (this.underweight) {
        this.bmiString = 'You are underweight.';
        // + 0,25 or 0,5
    } else if (this.normalweight) {
      this.bmiString = 'You are at an average weight';
      // 1 goal keep weight
    } else if (this.overweight) {
      this.bmiString = 'Lose some weight.';
      // - 0,25 or 0.5
    } else {
      this.bmiString = 'Damn ya fat.';
      // - 0,25 or 0.5

    }
  }

  processAlcCons() {
    this.alcCons = this.user.alcCons;

    this.normalDrinker = this.alcCons <= constants.ALCOHOL.WEEKLY_UNIT_MAX_LIMIT;
    this.heavyDrinker = this.alcCons > constants.ALCOHOL.WEEKLY_UNIT_MAX_LIMIT;


    if (this.normalDrinker) {
      this.alcConsString = 'Your alcohol consumption is within the recommended limit.';
      // 0 or 14
    } else {
      this.alcConsString = 'Your alcohol consumption is over the recommended limit.';
      // try to reduce by 5 %, if 5% < 1, then reduce by 1. Until you stop. 5 or 10

    }
  }

  processCigUse() {
    this.cigUse = this.user.cigUse;

    this.smoker = this.cigUse >= constants.CIGARETTES.UNHEALTHY_LOWER_LIMIT;
    this.nonSmoker = this.cigUse < constants.CIGARETTES.UNHEALTHY_LOWER_LIMIT;

    if (this.smoker) {
      this.cigUseString = 'You smoke, STAHP.';
      // try to reduce by 5 %, if 5% < 1, then reduce by 1. Until you stop. 5 or 10
    } else {
      this.cigUseString = 'GOOD BOI.';
      // Keep at it. Considered non - smoker
    }
  }

  ngOnInit() {
    this.recService.currentMessage.subscribe(user => this.user = user);
    this.doStuff();
  }

}
