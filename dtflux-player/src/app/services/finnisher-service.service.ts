import { Injectable } from '@angular/core';
import { StageFinishers } from '../dtflux-ui-model/core.model/StageFinishers';
import { RunnerResult } from '../dtflux-ui-model/core.model/RunnerResult';
import { RunnerResultsUI } from '../dtflux-ui-model/core.model/RunnerResults';

const spotterKeyword: string = "Dernière ligne droite";
const finishKeyword: string = "Arrivée";

@Injectable({
  providedIn: 'root',
})
export class FinnisherServiceService {
  private _finishers: StageFinishers = new StageFinishers();

  addFinisher(exporterData: any): void {
    const runner = RunnerResult.fromExporter(exporterData);
    if(!runner){
      throw new Error(`error creating finisher with data: ${exporterData}`);
    }
    if(runner && runner.currentSplitRank && runner.currentSplitName === finishKeyword) {
      // we have a finnisher

      if(runner.stageId === 5){
        // last stage
        if(runner.currentSplitRank === 1){
          // we have a winner
        }
      }
    }else{
      // this is a spotter
      this._finishers.spotters.push(runner);
    }
  }

  promoteSpotterToFinisher(runner: RunnerResult){
    const spotter = this._finishers.spotters;
    const bib = runner.bib;
    this._finishers.spotters = this._finishers.spotters.filter((obj) => obj.bib !== bib);
    this._finishers.finishers.push(runner);
    this.setTimout(() => {

    })
  }


}
