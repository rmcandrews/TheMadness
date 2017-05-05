import { Component, OnInit, Input } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {AF} from "./../../../providers/af";

@Component({
  selector: 'app-home-pool-overview',
  templateUrl: './home-pool-overview.component.html',
  styleUrls: ['./home-pool-overview.component.css']
})
export class HomePoolOverviewComponent implements OnInit {
  @Input() year: number;
  @Input() pool: Object;
  public participants: Array<Object> = [];
  
  public barChartOptions:any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          userCallback: function(label, index, labels) {
            if (Math.floor(label) === label) {
              return label;
            }
          },
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        }  
      }],
    },
  };
  public barChartLabels:string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
 
  public barChartData:any[] = [
    {data: [1, 1, 2, 3, 5, 5, 4, 2, 2, 0, 0, 1, 0, 0, 0, 0]}
  ];

  constructor(public afService: AF) {}

  ngOnInit() {
    for (let key in this.pool['participants']) {
      let participant = this.pool['participants'][key];
      participant.teamsRemaining = this.getTeamsRemaining(participant);
      this.participants.push(participant);
    }
  }

  getTeamsRemaining(participant) {
    const pickedTeams = participant.pickedTeams;
    const poolTeams = this.pool['teams'];
    let teamsRemaining = Object.assign({}, poolTeams);
    for (let pickedTeamKey in pickedTeams) {
      let pickedTeam = pickedTeams[pickedTeamKey];
      for (let poolTeamKey in poolTeams) {
        let poolTeam = poolTeams[poolTeamKey];
        if(pickedTeam['id'] === poolTeam['id']) {
          delete teamsRemaining[poolTeamKey];
        }
      }
    }
    return Object.keys(teamsRemaining).map(key => teamsRemaining[key]);
  }

}
