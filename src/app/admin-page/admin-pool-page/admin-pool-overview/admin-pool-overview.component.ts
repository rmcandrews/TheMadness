import { Component, OnInit, Input } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {AF} from "./../../../providers/af";

@Component({
  selector: 'app-admin-pool-overview',
  templateUrl: './admin-pool-overview.component.html',
  styleUrls: ['./admin-pool-overview.component.css']
})
export class AdminPoolOverviewComponent implements OnInit {
  @Input() year: number;
  public pool: Object;
  public participants: Array<Object> = [];

  constructor() { }

  ngOnInit() {
  }

}
