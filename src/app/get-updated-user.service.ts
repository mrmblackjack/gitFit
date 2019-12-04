import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetUpdatedUserService {
  private userData = new BehaviorSubject(false);
  new = this.userData.asObservable();

  
    changeUserData(array) {
      this.userData.next(array);
    }

  
}
