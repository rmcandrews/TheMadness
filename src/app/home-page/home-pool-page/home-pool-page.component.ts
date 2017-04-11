import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home-pool-page',
  templateUrl: './home-pool-page.component.html',
  styleUrls: ['./home-pool-page.component.css']
})
export class HomePoolPageComponent implements OnInit {
  public day = 0;
  public year : number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.year = params['id'];
    });
  }

  goToDay(day : number, $event) {
    $event.preventDefault();
    this.day = day;
  }

}
