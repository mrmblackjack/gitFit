import { SignInserviceService } from './../sign-inservice.service';
import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  env= environment.isLogged;
  asideVisible=false;

    constructor(private sidebarService: SignInserviceService) {
  
    }

  
    toggleBar(){
      this.asideVisible=!this.asideVisible;
      console.log(this.asideVisible);
    }

  // constructor(private breakpointObserver: BreakpointObserver) {
  //   console.log(this.env);
  // }

}
