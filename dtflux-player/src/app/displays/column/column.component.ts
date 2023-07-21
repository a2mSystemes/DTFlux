import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.sass']
})

export class ColumnComponent implements OnInit {
  _runnersResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: any[] = [];
  runner?: RunnerResult;
  indexColonne: number = -1;
  firstM: RunnerResult = new RunnerResult(); //pourquoi first M


  constructor(private _websocketService: WebsocketService, private _configService: ConfigService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = new RunnerResults(runners);
        this.tableData = runners;
        let i = 0;
        for (let runner of runners) {
          if (runners[i].currentSplitRank && (runner.gender === "M")) {
            if (runner.currentSplitRank === 1) this.firstM = runner;
          }
        }
      }
    });

    setInterval(() => {
      this.updateResults();
    },this._configService.getConf("columnSwitchTimer"))

  }
  updateResults() {
    // on prend le nombre déja affiché
    //
  }
  ngOnInit(): void {
  }

}
