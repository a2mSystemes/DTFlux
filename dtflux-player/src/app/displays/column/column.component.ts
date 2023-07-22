import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, timer } from 'rxjs';
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
  tableData: Array<RunnerResult> = new Array<RunnerResult>();
  tablefilter: Array<RunnerResult> = new Array<RunnerResult>();
  runner?: RunnerResult;
  indexColonne: number = -1;
  firstM?: RunnerResult = new RunnerResult();
  end: number = 13;
  fini : boolean = false;
  start = 1;
  private data?: RunnerResults;

  constructor(private _websocketService: WebsocketService, private _configService: ConfigService) {
    this.subRunnerResult = this._websocketService.subscribeWsLiveResult().subscribe({
      next: (runners: RunnerResults) => {
        this._runnersResults = this.filterNoTime(new RunnerResults(runners));
        this.tablefilter = this._runnersResults;
        this.firstM = this._runnersResults.shift();
      }
    });
    const t = this._configService.getConf("columnSwitchTimer")
    interval(6000).subscribe({ next : () =>{
      this.tablefilter = this._runnersResults;
      this.tableData  = this.tablefilter.slice(this.start, this.end);
      if(this.fini === true) {
        this.start = 0;
        this.end = 12;
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

  filterNoTime(data: RunnerResults):RunnerResults{
    const copy: RunnerResults = new RunnerResults();
    if(data.length > 0){
      for(let runner of data){
        // console.log(runner.swim);
        if(runner.swim !== "" ){
          copy.push(runner)
        }
      }
    }
    return copy;
  }
  updateResults() {
    // on prend le nombre déja affiché
    //
  }
  ngOnInit(): void {
  }

}
