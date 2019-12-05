import { SignInserviceService } from './../sign-inservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(navbarService: SignInserviceService) { 
    navbarService.currentVisibility.subscribe(visible => this.shouldShowNavbar = visible);

  }

  shouldShowNavbar;

  ngOnInit() {
  }

}
