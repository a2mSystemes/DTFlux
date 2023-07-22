import { Injectable } from '@angular/core';
import { WebsocketService } from './network/websocket.service';
import { StageFinishers } from '../dtflux-ui-model/core.model/StageFinishers';
import { Observable, Subject, Subscription } from 'rxjs';
import { RunnerResult } from '../dtflux-ui-model/core.model/RunnerResult';
import { ConfigService } from './config.service';
import { RunnerResults } from '../dtflux-ui-model/core.model/RunnerResults';

const finishKeyword = "Arrivée";

@Injectable({
  providedIn: 'root'
})
export class StageFinishersService {
    private _finishers: StageFinishers = new StageFinishers();
    private _finishersSubject: Subject<StageFinishers> = new Subject<StageFinishers>();
    private _finisherSubject: Subject<RunnerResult> = new Subject<RunnerResult>();
    private _spotterSubject: Subject<RunnerResult> = new Subject<RunnerResult>();

  constructor(private _websocketService: WebsocketService){
    // we obtain exporter data from the subject
    this._websocketService.subscribeWsExporter().subscribe({
      next: (changes:RunnerResult) => {

        if(changes.contestId){
        console.log("split name : " + changes.currentSplitName);
        this.addFinisher(changes);
        }else{
          console.log("not a runner result");
        }
      },
      error: (err) => console.error(err)
    });

  }
    addFinisher(exporterData: RunnerResult): void {

      const runner = exporterData;

      if(!runner){
        throw new Error(`error creating finisher with data: ${exporterData}`);
      }
      if(runner.currentSplitRank && runner.currentSplitName === finishKeyword) {
        // we have a finisher
        // console.log("promoting spotter to finisher")
        this.promoteSpotterToFinisher(runner);
        this.removeFinisher(runner.bib);
        this._finisherSubject.next(runner);
      }else{
        // this is a spotter
        console.log("adding to spotter")
        // console.log(runner);
        this._finishers.spotters.push(runner);
        this._spotterSubject.next(runner);
      }
    }

    promoteSpotterToFinisher(runner: RunnerResult){
      console.log("promote to finisher");
      const bib = runner.bib;
      this.removeSpotters(bib);
      this._finishers.finishers.push(runner);
    }

    removeFinisher(bib: number) {
      setTimeout(() => {
        this._finishers.finishers.removeByBib(bib);
      }, 2000);
    }

    removeSpotters(bib: number){
      return this._finishers.spotters.filter((obj: any) => obj.bib !== bib);
    }

    getSubscriber():Observable<StageFinishers>{
      return this._finishersSubject.asObservable();
    }
    getSpotterSubscriber():Observable<RunnerResult>{
      return this._spotterSubject.asObservable();
    }
    getfinnisherSubscriber():Observable<RunnerResult>{
      return this._finisherSubject.asObservable();
    }
  }
