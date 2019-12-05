import { SignInserviceService } from './../sign-inservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private avbarService: SignInserviceService) {}
  username = 'User 1';

  ngOnInit() {
    this.avbarService.name.subscribe(name => this.username = name);

  }


}
