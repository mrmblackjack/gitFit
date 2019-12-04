import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { FormsModule } from '@angular/forms';
import users from '../users.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  model = new User();

  submit() {
    console.log(this.model);
  }

  constructor() { }

  ngOnInit() {
  }

}
