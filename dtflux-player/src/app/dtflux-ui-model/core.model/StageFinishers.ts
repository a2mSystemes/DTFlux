import { RunnerResultsUI } from "./RunnerResults";
import { RunnerResult } from "./RunnerResult";
import { ConfigService } from "src/app/services/config.service";

export class StageFinishers {

  private _confService: ConfigService = new ConfigService();
  spotters: RunnerResultsUI = new RunnerResultsUI();
  maxSpotters: number = 4; // default to 4 max spotters
  finishers: RunnerResultsUI = new RunnerResultsUI();
  maxFinisher: number = 4; // default to 4 max
  winner: RunnerResult = new RunnerResult();


  addExporterData(jsonData: any) {
    const runner = new RunnerResult(jsonData);
    // it's a finisher
    if (runner.currentSplitName === StageFinishers.finishKeyword) {
      const finisherBib = runner.bib;
      this.finishers.push(runner);
      const finishBib = runner.bib;
      this.removeSpotter(finishBib);
      setTimeout(() => {
        this.removeFinisher(finishBib);
      }, this._confService.getConf("displayFinisherTime"));
    }
  }
  removeFinisher(finishBib: number) {
    const copyArray = new RunnerResultsUI();
    for (let runner of this.finishers) {
      if (runner.bib !== finishBib) {
        copyArray.push(runner);
      }
    }
    this.spotters = copyArray;
  }
  removeSpotter(spotterBib: number) {
    const copyArray = new RunnerResultsUI();
    for (let runner of this.spotters) {
      if (runner.bib !== spotterBib) {
        copyArray.push(runner);
      }
    }
    this.spotters = copyArray;
  }
}
