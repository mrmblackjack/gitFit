import { SignInserviceService } from './../sign-inservice.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    constructor(private navbarService: SignInserviceService) {
    this.navbarService.currentVisibility.subscribe(visible => this.shouldShowNavbar = visible);

    }

  shouldShowNavbar = false;

  ngOnInit() {
  }
}
