import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor() { }

  private messageSource = new BehaviorSubject('none');
  currentMessage = this.messageSource.asObservable();

  changeUserData(user) {
    this.messageSource.next(user);
  }

}
