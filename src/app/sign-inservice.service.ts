import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignInserviceService {

//   sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();
//   isSidebarVisible: boolean;

//   private putka = new BehaviorSubject(false);
//   currentPutka = this.putka.asObservable();

//   changeLoginData(login) {
//     this.putka.next(login);
//   }
//   constructor()  {
//     this.sidebarVisibilityChange.subscribe((value) => {
//       this.isSidebarVisible = value
//   });

// }

// toggleSidebarVisibilty() {
//   this.sidebarVisibilityChange.next(!this.isSidebarVisible);

// }
isSidebarVisible: boolean;

sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

constructor()  {
    this.sidebarVisibilityChange.subscribe((value) => {
        this.isSidebarVisible = value
    });
}

toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.isSidebarVisible);
}

}
