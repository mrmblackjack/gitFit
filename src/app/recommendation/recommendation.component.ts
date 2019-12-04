import { RecommendationService } from './../recommendationService.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  constructor(private recService: RecommendationService) { }
  user = '';


  ngOnInit() {
    this.recService.currentMessage.subscribe(user => this.user = user);
  }

}
