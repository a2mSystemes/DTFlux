import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, timer } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-column',
  templateUrl: './column-arche.component.html',
  styleUrls: ['./column-arche.component.sass']
})

export class ColumnArcheComponent implements OnInit {
  _runnersResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: Array<RunnerResult> = new Array<RunnerResult>();
  runner?: RunnerResult;
  firstM?: RunnerResult = new RunnerResult();




  constructor(private _websocketService: WebsocketService, private _configService: ConfigService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = new RunnerResults(runners);
        this.firstM = this._runnersResults.shift();
      if(this._runnersResults.length > 8)
        this.tableData  = this._runnersResults.slice(this._runnersResults.length - 8, this._runnersResults.length);
      else this.tableData = this._runnersResults.slice(1,9);

      // console.log(this.tableData)
      // console.log(this.tableData.length)
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
