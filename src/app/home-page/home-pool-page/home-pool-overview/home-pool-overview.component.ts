import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-pool-overview',
  templateUrl: './home-pool-overview.component.html',
  styleUrls: ['./home-pool-overview.component.css']
})
export class HomePoolOverviewComponent implements OnInit {
  @Input() year: number;

  constructor() { }

  ngOnInit() {
  }

}
