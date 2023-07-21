import { Injectable } from '@angular/core';
import { WebsocketService } from './network/websocket.service';
import { StageFinishers } from '../dtflux-ui-model/core.model/StageFinishers';
import { Observable, Subject, Subscription } from 'rxjs';
import { RunnerResult } from '../dtflux-ui-model/core.model/RunnerResult';
import { ConfigService } from './config.service';

const finishKeyword = "Arrivée";

@Injectable({
  providedIn: 'root'
})
export class StageFinishersService {
    private _finishers: StageFinishers = new StageFinishers();
    private _finisherSubject: Subject<StageFinishers> = new Subject<StageFinishers>();

  constructor(private _websocketService: WebsocketService, private _configService: ConfigService){
    // we obtain exporter data from the subject
    this._websocketService.subscribeWsExporter().subscribe({
      next: (changes:StageFinishers) => {
        this.addFinisher(changes);
        console.log("finishers modified");
        this._finisherSubject.next(this._finishers);
      },
      error: (err) => console.error(err)
    });

  }
    addFinisher(exporterData: any): void {
      const runner = exporterData;
      if(!runner){
        throw new Error(`error creating finisher with data: ${exporterData}`);
      }
      if(runner.currentSplitRank && runner.currentSplitName === finishKeyword) {
        // we have a finisher
        this.promoteSpotterToFinisher(runner);
      }else{
        // this is a spotter
        this._finishers.spotters.push(runner);
      }
    }

    promoteSpotterToFinisher(runner: RunnerResult){
      const bib = runner.bib;
      this.removeSpotters(bib);
      this._finishers.finishers.push(runner);

    }

    removeFinisher(bib: number){
      // return this._finishers.finishers.filter((obj: any) => obj.bib !== bib);
      this
    }

    removeSpotters(bib: number){
      return this._finishers.spotters.filter((obj: any) => obj.bib !== bib);
    }

    getSubscriber():Observable<StageFinishers>{
      return this._finisherSubject.asObservable();
    }
  }
