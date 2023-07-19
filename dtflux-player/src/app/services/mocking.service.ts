import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { IRunner, Runner, RunnerResult } from '../dtflux-ui-model/IRunner';
import { IExporterResult, ExporterResult } from '../dtflux-ui-model/IExporterResult';
import { ILiveResult, LiveResult } from '../dtflux-ui-model/ILiveResult';

class MockingData<T>{
  private data:T
  constructor(data: T){
    this.data = data;
    }
  }
@Injectable({
  providedIn: 'root'
})


export class MockingService {
  public static test:number = 0;
  private _runnerResults: Array<RunnerResult> = new Array<RunnerResult>() ;
  private _runnerResultsSubject: Subject<Array<RunnerResult>> = new Subject<Array<RunnerResult>>();



  constructor() {

        for(let i = 0 ; i < 10; i++){
          const runner = new RunnerResult()
          runner.contestId = 2;
          runner.stageId  = 2;
          runner.bib = 100 + i;
          runner.lastName = "Last" + i;
          runner.firstName = "First" + i;
          if(i%2 == 0) runner.gender = "M";
          else runner.gender = "F";
          runner.lastName2 = "LastR" + i;
          runner.firstName2 = "FirstR" + i;

          runner.startTime = "08:30:00";
          runner.currentSplitName = "Kilo XPS Relais";
          runner.currentSplitRank = 1 + i;
          runner.currentSplitTime = "21:1" + i;
          runner.currentSplitGap = "+01:2" + i;
          runner.split1Gap = "+00:1" + i;
          runner.split1Time = "05:0" +i;
          runner.split1Rank = 1 + i;
          runner.split2Gap = "+00:2" + i;
          runner.split2Time = "10:0" +i;
          runner.split2Rank = 1 + i;
          runner.split3Gap = "+00:3" + i;
          runner.split3Time = "15:0" +i;
          runner.split3Rank = 1 + i;
          runner.split4Gap = "+00:4" + i;
          runner.split4Time = "20:0" +i;
          runner.split4Rank = 1 + i;
          runner.split5Gap = "+00:5" + i;
          runner.split5Time = "25:0" +i;
          runner.split5Rank = 1 + i;
          runner.finishGap = "+01:0" + i;
          runner.finishTime = "40:0" + i;
          runner.finishRank = 1 + i;
          runner.swim = "20:0" + i;
          runner.transition = "01:0" + i;
          runner.run = "40:0" + i;
          runner.photo = "/assets/photos-coureurs/109.png";
          this._runnerResults.push(runner);
        }
    setTimeout(() => {
      this._runnerResultsSubject.next(this._runnerResults);
    }, 100)
        // console.log(this._runnerResults);
  }


  subscribeRunnersResults(): Subject<any> {
      return this._runnerResultsSubject;
  }



}


