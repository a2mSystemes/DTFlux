import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-column-winner',
  templateUrl: './column-winner.component.html',
  styleUrls: ['./column-winner.component.sass']
})
export class ColumnWinnerComponent implements OnInit{
  _runnersResult$:RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: any[] = [];
  runner?: RunnerResult;
  indexColonne: number = -1;
  winner: boolean = false;
  runnerWinner: RunnerResult = new RunnerResult();
  winnerFok: boolean = false;
  winnerHok: boolean = false;

  constructor(private _mockingService:MockingService){
    this.subRunnerResult = this._mockingService.subscribeRunnersResults().subscribe({next : (runners: RunnerResults) => {
      this._runnersResult$ = runners;
      let i=0;
      for (let runner of runners){
          if(runner.finishRank === 1 && runner.gender === "M" && this.winnerHok === false){
            this.winner = true;
            this.runnerWinner = runner;
            setTimeout(() => this.winnerStop("M"),60000);
          }
          if(runner.finishRank === 1 && runner.gender === "F" && this.winnerFok === false){
            this.winner = true;
            this.runnerWinner = runner;
            setTimeout(() => this.winnerStop("F"),60000);
          }
      }
    }});

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  winnerStop(genre:string): void {
    if(genre === "M") this.winnerHok = true;
    if(genre === "F") this.winnerFok = true;
    this.winner = false;
  }
}
