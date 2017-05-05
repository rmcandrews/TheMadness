import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-admin-pool-page',
  templateUrl: './admin-pool-page.component.html',
  styleUrls: ['./admin-pool-page.component.css']
})
export class AdminPoolPageComponent implements OnInit {
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
