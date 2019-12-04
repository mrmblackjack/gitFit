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
  bmiAdvice = '';

  calculateBMI(){
    this.BMI = this.user.weight / (this.user.height / 100) ** 2;
    if (this.BMI < constants.BMI.NORMAL_LOWER_LIMIT) {
        this.bmiAdvice = 'You are underweight! Eat some Kettle ;)';
    } else if (this.BMI < constants.BMI.OVERWEIGHT_LOWER_LIMIT) {
      this.bmiAdvice = 'Yer fine';
    } else if (this.BMI < constants.BMI.OBESE_LOWER_LIMIT) {
      this.bmiAdvice = 'Lose some weight';
    } else{
      this.bmiAdvice = 'Damn ya fat';
 }
  }



ngOnInit() {
    this.recService.currentMessage.subscribe(user => this.user = user);
  }

}
