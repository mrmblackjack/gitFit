import { RecommendationService } from './../recommendationService.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {Router} from "@angular/router"


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  model = new User() as any;
  khh = null;

  submit() {
    this.recService.changeUserData(this.model);
    this.khh = this.model;
    this.router.navigate(['/recommend']);

  }

  constructor(private recService: RecommendationService, private router: Router) { }

  ngOnInit() {
    // this.recService.currentMessage.subscribe(user => this.khh = user);
  }

}
