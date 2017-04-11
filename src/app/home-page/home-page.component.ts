import { Component, OnInit } from '@angular/core';
import {AF} from "./../providers/af";
import { Router } from "@angular/router";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public pools: FirebaseListObservable<any>;

  constructor(public afService: AF, private StateService: StateService, private router: Router) {
    this.pools = this.afService.pools;
  }

  ngOnInit() {}

  logout($event) {
    $event.preventDefault();
    this.afService.logout();
  }

  goToMessagePage($event) {
    $event.preventDefault();
    this.router.navigate(['message']);
  }

  goToAdminPage($event) {
    $event.preventDefault();
    this.router.navigate(['admin']);
  }

  joinPool($event, pool) {
    $event.preventDefault();
    this.afService.addUserToPool(pool);
  }

  userInPool(pool) {
    let participants = pool.participants;
    if(participants) {
      return participants.some(participant => {
        return participant.uid === this.afService.uid;
      });
    }
    return false; 
  }

}
