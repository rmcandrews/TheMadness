import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import { Router } from "@angular/router";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-admin-pool-list',
  templateUrl: './admin-pool-list.component.html',
  styleUrls: ['./admin-pool-list.component.css']
})
export class AdminPoolListComponent implements OnInit {
  public pools: FirebaseListObservable<any>;

  constructor(public afService: AF, private router: Router) { 
    this.pools = this.afService.pools;
  }

  ngOnInit() {
  }

  goToCreatePool($event) {
    $event.preventDefault();
    this.router.navigate(['admin/create-pool']);
  }

}
