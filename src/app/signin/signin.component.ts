import { SignInserviceService } from './../sign-inservice.service';
import { Component, OnInit , Input} from '@angular/core';
import users from 'users.json';
import UserSignIn from './user';
import { Router} from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],

})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private navbarService: SignInserviceService) {
  }
  usersList = users;
  model = new UserSignIn();

  @Input()env = environment.isLogged;


  onSubmit() {
    for (const key in users) {
      if (this.model.username === key) {
         if (users[key].password === this.model.password) {
          this.navbarService.changeNavbarVis(true);
          this.navbarService.changeUsernameVis(this.model.username);
          this.router.navigate(['/', 'home']);



         }
      }
  }

  }

  ngOnInit() {
  }

}
