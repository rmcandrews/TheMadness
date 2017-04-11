import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import {AF} from "./../../providers/af";
import { SelectComponent } from 'ng2-select'
 
@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styles: [``],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class TeamSelectorComponent implements OnInit {
  @ViewChild('recipientsInput') recipientsInput: SelectComponent
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = true;
  private teams:any = [];

  @Output() teamSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(public afService: AF) {}
 
  public ngOnInit():any {
    this.recipientsInput.items = [];
    this.afService.getTeams()
    .then(teams => {
      this.teams = teams;
      teams.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      this.recipientsInput.items = teams.map(team => {
        let image = `http://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${team.id}.png&h=60&w=60`
        let text = `<img src="${image}" height="25" width="25"><span> ${team.name}</span>`
        return {
          id: team.name,
          text: text
        };
      });
      this.disabled = false;
    }); 
  }
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }
 
  public selected(value:any):void {
    let team = this.teams.find(team => team.name === value.id);
    this.teamSelected.emit(team); 
  }
 
  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }
 
  public typed(value:any):void {
    console.log('New search input: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
  }
}
