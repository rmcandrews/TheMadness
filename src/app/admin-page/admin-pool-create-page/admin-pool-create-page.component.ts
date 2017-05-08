import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-pool-create-page',
  templateUrl: './admin-pool-create-page.component.html',
  styleUrls: ['./admin-pool-create-page.component.css']
})
export class AdminPoolCreatePageComponent implements OnInit {
  public year:number;
  public selectedTeam:any;
  public selectedSeed:string;
  public selectedRegion:string;
  public teams:Array<any> = [];
  public teamAddError:string = null;
  public poolCreateError:string = null;
  public seedOptions:Array<string> = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];

  constructor(public afService: AF, private router: Router) { }

  ngOnInit() {
  }

  onTeamSelected($event) {
    this.selectedTeam = $event;
    this.teamAddError = null;
  }

  seedSelected($event) {
    this.selectedSeed = $event.text;
    this.teamAddError = null;
  }

  regionSelected($event) {
    this.selectedRegion = $event.text;
    this.teamAddError = null;
  }

  addTeam($event) {
    $event.preventDefault();
    this.validatedTeamAdd();
    if (!this.teamAddError) {
      this.selectedTeam.region = this.selectedRegion;
      this.selectedTeam.seed = this.selectedSeed;
      this.selectedTeam.eliminated = false;
      this.teams.push(this.selectedTeam);
      this.teams.sort(function(a, b) {
        return parseFloat(a.seed) - parseFloat(b.seed);
      });
      this.teamAddError = null;
    }
  }

  validatedTeamAdd() {
    if (!this.selectedTeam) {
      this.teamAddError = "NO TEAM SELECTED";
      return;
    } else if (!this.selectedSeed) {
      this.teamAddError = "NO SEED SELECTED";
      return;
    } else if (!this.selectedRegion) {
      this.teamAddError = "NO REGION SELECTED";
      return;
    }

    if(this.teams.length === 68) {
      this.teamAddError = `CAN ONLY HAVE UP TO 68 TEAMS`;
      return;
    }

    for (let team of this.teams) {
      if(team.name == this.selectedTeam.name) {
        this.teamAddError = `${team.name.toUpperCase()} ALREADY ADDED`;
        return;
      }
      if(this.selectedSeed == '16' || this.selectedSeed == '11') {
        return;
      }
      if(team.seed == this.selectedSeed && team.region == this.selectedRegion) {
        this.teamAddError = `${this.selectedRegion.toUpperCase()} ${this.selectedSeed} SEED ALREADY EXISTS`;
        return;
      }
    }
  }

  removeTeam($event, teamToRemove) {
    $event.preventDefault();
    for(let i = this.teams.length - 1; i >= 0; i--) {
      if(this.teams[i].name === teamToRemove.name) {
        this.teams.splice(i, 1);
        return;
      }
    }
  }

  createPool($event) {
    $event.preventDefault();
    this.poolCreateError = null;
    this.validatePoolCreate();
    if(this.poolCreateError) {
      return;
    }
    const pool = {
      year: this.year,
      participants: [],
      teams: this.teams,
      status: {
        day: 1,
        state: "pending"
      }
    }
    this.afService.createPool(pool)
    .then(() => {
      this.router.navigate(['/admin']);
    });
  }

  validatePoolCreate() {
    if (this.teams.length < 64) {
      this.poolCreateError = `MUST HAVE AT LEAST 64 TEAMS, CURRENTLY ${this.teams.length}`;
    }
    if (!this.year) {
      this.poolCreateError = `PLEASE ENTER A YEAR`;
    }
  }

  public removed(value:any):void {}
 
  public typed(value:any):void {}
 
  public refreshValue(value:any):void {}

}
