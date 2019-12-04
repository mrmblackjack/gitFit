import { SignInserviceService } from './../sign-inservice.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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


  ngOnChanges(){
  }
  ngOnInit() {
  }
}
