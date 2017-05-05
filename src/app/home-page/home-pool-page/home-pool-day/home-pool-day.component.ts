import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-pool-day',
  templateUrl: './home-pool-day.component.html',
  styleUrls: ['./home-pool-day.component.css']
})
export class HomePoolDayComponent implements OnInit {
  @Input() day: number;
  @Input() year: number;
  @Input() pool: Object;

  constructor() { }

  ngOnInit() {
  }

}
