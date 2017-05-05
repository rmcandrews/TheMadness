import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-pool-day',
  templateUrl: './admin-pool-day.component.html',
  styleUrls: ['./admin-pool-day.component.css']
})
export class AdminPoolDayComponent implements OnInit {
  @Input() day: number;
  @Input() year: number;
  public addingGame = false;

  constructor() { }

  ngOnInit() {
  }

  startAddGame($event) {
    $event.preventDefault();
    this.addingGame = true;
  }

}
