import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor() { }

  private goalSource = new BehaviorSubject({});
  currentGoalObj = this.goalSource.asObservable();

  setGoalData(goalObj) {
    this.goalSource.next(goalObj);
  }

}
