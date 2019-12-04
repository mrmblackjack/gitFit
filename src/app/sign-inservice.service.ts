import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignInserviceService {


private navbarVisibility = new BehaviorSubject(false);
currentVisibility = this.navbarVisibility.asObservable();

private username = new BehaviorSubject("");
name = this.username.asObservable();

  changeNavbarVis(bool) {
    this.navbarVisibility.next(bool);
  }
  changeUsernameVis(string) {
    this.username.next(string);
  }

}
