import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Runner, RunnerResult } from '../dtflux-ui-model/IRunner';
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
  private _exporter: Array<IExporterResult> = new Array<ExporterResult>() ;
  private _liveResult: Array<ILiveResult> = new Array<LiveResult>() ;
  private _exporterSubject: Subject<Array<IExporterResult>> = new Subject<Array<IExporterResult>>()
  private _liveResultSubject: Subject<Array<ILiveResult>> = new Subject<Array<ILiveResult>>()


  constructor() {
          let i=0;
        for(i ; i++; i < 10){
          const exporter = new ExporterResult()
          const result = new LiveResult();

          exporter.ContestID = result.ContestID =  1;
          exporter.ContestName = result.ContestName = "XPS Relais";
          exporter.StageID = result.StageID = 1;
          exporter.StageName = result.StageName = "Kilo";
          exporter.Bib = result.Bib = 100 + i;
          exporter.Lastname = result.Lastname = "Last" + i;
          exporter.Firstname = result.Firstname = "First" + i;
          if(i%2 == 0) exporter.Gender = result.Gender = "M";
          else exporter.Gender = result.Gender = "F";
          exporter.Club = result.Club = "";
          exporter.Lastname2 = result.Lastname2 = "LastR" + i;
          exporter.Firstname2 = result.Firstname2 = "FirstR" + i;
          if(i%2 == 0) exporter.Gender2 = result.Gender2 = "F";
          else exporter.Gender2 = result.Gender2 = "M";
          exporter.Club2 = result.Club2 = "";
          exporter.TeamName = result.TeamName = "";
          exporter.Category = result.Category = "Master";
          exporter.StartTime = "08:30:00";
          exporter.CurrentSplitName = "Kilo XPS Relais";
          exporter.CurrentSplitRank = 1 + i;
          exporter.CurrentSplitTime = "21:1" + i;
          exporter.CurrentSplitGap = "+01:2" + i;
          this._exporter.push(exporter);

          result.FinishGap = "+01:0" + i;
          result.CurrentSplitRank = i;
          result.FinishTime = "40:0" + i;
          result.Split1Gap = "+00:1" + i;
          result.Split1Time = "05:0" +i;
          result.Split2Gap = "+00:2" + i;
          result.Split2Time = "10:0" +i;
          result.Split3Gap = "+00:3" + i;
          result.Split3Time = "15:0" +i;
          result.Split4Gap = "+00:4" + i;
          result.Split4Time = "20:0" +i;
          result.Split5Gap = "+00:5" + i;
          result.Split5Time = "25:0" +i;
          this._liveResult.push(result);
        }
        this._exporterSubject.next(this._exporter);
        this._liveResultSubject.next(this._liveResult);

  }

  subscribeExporterDatas(): Observable<Array<IExporterResult>>{
      return this._exporterSubject.asObservable();
  }
  subscribeLiveResultDatas(): Observable<Array<ILiveResult>>{
      return this._liveResultSubject.asObservable();
  }



}


