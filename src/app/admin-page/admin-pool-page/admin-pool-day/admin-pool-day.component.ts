import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {AF} from "./../../../providers/af";

@Component({
  selector: 'app-admin-pool-day',
  templateUrl: './admin-pool-day.component.html',
  styleUrls: ['./admin-pool-day.component.css']
})
export class AdminPoolDayComponent implements OnInit, OnChanges {
  @Input() day: number;
  @Input() year: number;
  @Input() pool: Object;
  public games : FirebaseListObservable<any>;
  public gamesData : Array<any>;
  public remainingTeams : Array<Object> = [];
  public addingGame = false;
  public teamSelectorItems : Array<any> = [];
  public bootstrapped = false;

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = true;
  private team1:any;
  private team2:any;
  public gameSaveError = null;

  private maxGamesPerDay = {1:16,2:16,3:8,4:8,5:4,6:4,7:2,8:2,9:2,10:1}
  private maxGames: number;

  constructor(public afService: AF) {}

  ngOnInit() {
    for (let key in this.pool['teams']) {
      let team = this.pool['teams'][key];
      if(!team.eliminated) {
        this.remainingTeams.push(team);
      }
    }

    this.teamSelectorItems = this.remainingTeams.map(team => {
        let image = `http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${team['id']}.png&h=60&w=60`
        let text = `<img src="${image}" height="25" width="25" style="vertical-align: initial;">
                    <span style="display: inline-block; margin-left: 10px; margin-top: 5px;"> ${team['name']}</span>`
        return {
          id: team['id'],
          text: text
        };
    });
  }

  ngOnChanges() {
    this.bootstrapped = false;
    this.maxGames = this.maxGamesPerDay[this.day];
    this.games = this.afService.getGamesWithYearAndDay(this.year, this.day);
    this.refreshGameData()
    .then(gamesData => {
      this.gamesData = gamesData;
      this.bootstrapped = true;
    });
  }

  updatePoolStatus(state, day) {
    let status = {
      state: state,
      day: day
    };
    this.afService.updatePoolStatus(this.pool['$key'], status).then(() => {
      this.pool['status'] = status;
    });
  }

  refreshGameData() {
    return this.games.first().toPromise();
  }

  addGame($event) {
    $event.preventDefault();
    this.gameSaveError = null;
    if(this.doesGameSaveContaineIssue()) {
      return;
    }
    let game = {
      team1: this.team1,
      team2: this.team2,
      year: Number(this.year),
      day: Number(this.day),
      yearDay: `${this.year}-${this.day}`
    }
    this.afService.addGame(game)
    .then(() => {
      this.addingGame = false;
      this.refreshGameData()
      .then(gamesData => {
        this.gamesData = gamesData;
      });
    });
  }

  removeGame(game) {
    this.afService.removeGame(game).then(() => {
      this.refreshGameData()
      .then(gamesData => {
        this.gamesData = gamesData;
      });
    });
  }

  doesGameSaveContaineIssue() {
    if (!this.team1 || !this.team2) {
      this.gameSaveError = "Pick 2 teams dummy";
      return true;
    }
    if (this.team1.id == this.team2.id) {
      this.gameSaveError = "You picked the same team dummy";
      return true;
    }
    return false;
  }

  toggleAddingGame($event) {
    $event.preventDefault();
    this.addingGame = !this.addingGame;
  }

  public teamSelected1(value:any):void {
    for (let key in this.remainingTeams) {
      let team = this.remainingTeams[key];
      if(team['id'] === value.id) {
        this.team1 = team;
        break;
      }
    }
  }

  public teamSelected2(value:any):void {
    for (let key in this.remainingTeams) {
      let team = this.remainingTeams[key];
      if(team['id'] === value.id) {
        this.team2 = team;
        break;
      }
    }
  }
 
  public removed(value:any):void {}
 
  public typed(value:any):void {}
 
  public refreshValue(value:any):void {
    this.value = value;
  }

}
