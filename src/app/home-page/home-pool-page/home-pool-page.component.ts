import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {AF} from "./../../providers/af";

@Component({
  selector: 'app-home-pool-page',
  templateUrl: './home-pool-page.component.html',
  styleUrls: ['./home-pool-page.component.css']
})
export class HomePoolPageComponent implements OnInit {
  public day = 0;
  public year : number;
  public pool : Object;

  constructor(private activatedRoute: ActivatedRoute, public afService: AF) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.year = params['id'];
      this.afService.getPoolsWithYear(this.year)
      .then(pools => {
        this.pool = pools[0];
      })
    });
  }

  goToDay(day : number, $event) {
    $event.preventDefault();
    this.day = day;
  }

}
