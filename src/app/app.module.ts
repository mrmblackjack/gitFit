import { Globals } from './globals';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { NavComponent } from './nav/nav.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { GroupComponent } from './group/group.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      SigninComponent,
      RegistrationComponent,
      RecommendationComponent,
      GroupComponent,
      ChartComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ChartsModule,
      BrowserAnimationsModule,
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      FormsModule
   ],
   providers: [
      Globals
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
