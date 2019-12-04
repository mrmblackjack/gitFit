import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignInserviceService {


private navbarVisibility = new BehaviorSubject(false);
currentVisibility = this.navbarVisibility.asObservable();

  changeNavbarVis(bool) {
    this.navbarVisibility.next(bool);
  }

}
