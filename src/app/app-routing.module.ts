import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'register', component:  RegistrationComponent },
  { path: 'recommend', component:  RecommendationComponent },
  {path: 'home', component: HomeComponent},
  {path: 'group', component: GroupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
