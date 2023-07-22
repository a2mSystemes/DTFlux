import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, timer } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-column',
  templateUrl: './column-arche-f.component.html',
  styleUrls: ['./column-arche-f.component.sass']
})

export class ColumnArcheFComponent implements OnInit {
  _runnersResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: Array<RunnerResult> = new Array<RunnerResult>();
  tablefilter: Array<RunnerResult> = new Array<RunnerResult>();
  runner?: RunnerResult;
  firstM?: RunnerResult = new RunnerResult();
  genderfilter : string = "F";




  constructor(private _websocketService: WebsocketService, private _configService: ConfigService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = new RunnerResults(runners);
        const filterByGender = (runner: RunnerResult) => {
          return (runner.gender === this.genderfilter
            && runner.currentSplitGap !== "" && runner.currentSplitTime !== ""
          && runner.currentSplitRank >= 1);}
        this.tablefilter = this._runnersResults.filter(filterByGender);
        this.firstM = this.tablefilter.shift();
      if(this.tablefilter.length > 8) this.tableData  = this.tablefilter.slice(this.tablefilter.length - 8, this.tablefilter.length);
      else this.tableData = this.tablefilter.slice(1,9);

      console.log(this.tableData)
      console.log(this.tableData.length)
      }
    });


  }
  updateResults() {
    // on prend le nombre déja affiché
    //
  }
  ngOnInit(): void {
  }

}
