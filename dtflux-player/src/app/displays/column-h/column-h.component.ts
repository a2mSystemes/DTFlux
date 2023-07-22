import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, timer } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-column',
  templateUrl: './column-h.component.html',
  styleUrls: ['./column-h.component.sass']
})

export class ColumnHComponent implements OnInit {
  _runnersResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: Array<RunnerResult> = new Array<RunnerResult>();
  tablefilter: Array<RunnerResult> = new Array<RunnerResult>();
  runner?: RunnerResult;
  indexColonne: number = -1;
  firstM?: RunnerResult = new RunnerResult();
  end: number = 13;
  fini : boolean = false;
  start = 1;
  genderfilter : string = "M";





  constructor(private _websocketService: WebsocketService, private _configService: ConfigService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = new RunnerResults(runners);
        const filterByGender = (runner: RunnerResult) => {
          return runner.gender === this.genderfilter;}
        this.tablefilter = this._runnersResults.filter(filterByGender);
        this.firstM = this.tablefilter.shift();
      }
    });
    const t = this._configService.getConf("columnSwitchTimer")
    interval(6000).subscribe({ next : () =>{
      const filterByGender = (runner: RunnerResult) => {
        return runner.gender === this.genderfilter;}
      this.tablefilter = this._runnersResults.filter(filterByGender);
      this.tableData  = this.tablefilter.slice(this.start, this.end);
      if(this.fini === true) {
        this.start = 1;
        this.end = 13;
        this.fini = false;
      }
      else {
        if(this.start + 12 < this.tablefilter.length) this.start += 12;
        if(this.end + 12 > this.tablefilter.length) {
          this.end = this.tablefilter.length;
          this.fini = true;
        }
        else this.end += 12;
      }

      console.log(this.tableData)
      console.log(this.start)
      console.log(this.tablefilter.length)
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
