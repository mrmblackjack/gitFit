import { SignInserviceService } from './../sign-inservice.service';
import { NavComponent } from './../nav/nav.component';
import { Component, OnInit , Input} from '@angular/core';
import users from "../users.json";
import UserSignIn from './user';
import { Router,RouterModule, Routes } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],

})
export class SigninComponent implements OnInit {
  users_list = users;
  model = new UserSignIn();


    get isSidebarVisible(): boolean {
        return this.sidebarService.isSidebarVisible;
    }

    toggleSidebar() {
        this.sidebarService.toggleSidebarVisibility()
    }

  @Input()env=environment.isLogged;

  onSubmit(){
    for (var key in users) {
      if (this.model.username===key) {
         if(users[key].password==this.model.password){
           console.log("yeyy");
            this.env=true;
            console.log;

           

         }
      }else{
        // NavComponent.setEnv(false);
        // console.log(NavComponent.env1);


      }
  }

  }

  constructor(private router: Router, private sidebarService: SignInserviceService) { 
  }

  ngOnInit() {
  }

}
