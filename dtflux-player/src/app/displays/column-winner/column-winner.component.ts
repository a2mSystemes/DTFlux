import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-column-winner',
  templateUrl: './column-winner.component.html',
  styleUrls: ['./column-winner.component.sass']
})
export class ColumnWinnerComponent implements OnInit {
  _runnersResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  runnerWinner?: RunnerResult = new RunnerResult();
  contestId?: number;

  constructor(private _websocketService: WebsocketService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = new RunnerResults(runners);
        this.runnerWinner = this._runnersResults.shift(); // TODO: check if this is the winner
        if (this.runnerWinner) {
          console.log(this.runnerWinner);
          this.runnerWinner.photo = "/assets/photos-coureurs/" + this.runnerWinner.bib + ".png";
          console.log(this.runnerWinner.photo);
        }
      }
    });
  }
  ngOnInit(): void {
  }
}
