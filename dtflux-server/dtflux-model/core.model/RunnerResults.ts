import { FilteredArray } from "./FilteredArray";
import { ILiveResult } from "../race-result.model/ILiveResult";
import { Runner } from "./Runner";
import { ITimingRunner } from "./ITimingRunner";


export class RunnerResults extends FilteredArray<RunnerResult> {

  constructor(raceResults?: any) {
    super();
    if (raceResults) {
      for (let raceResult of raceResults) {
        this.push(new RunnerResult(raceResult));
      }
    }
  }
  getRunnerResultBib(bib: number): RunnerResult | undefined {
    for (let runner of this) {
      if (runner.bib === bib) {
        return runner;
      }
    }
    return undefined;
  }
  getRunnerResultBibIndex(bib: number): number {
    let index = 0;
    for (let str in this) {
      if (this[index].bib === bib) {
        console.log(str);
        return index;
      }
      index++;
    }
    return -1;
  }
}




export class RunnerResult extends Runner implements ITimingRunner {
  startTime: string = "";
  split1Rank: number = 0;
  split1Time: string = ""; //time
  split1Gap: string = ""; // "-" if first or "+$min:$sec"
  split2Rank: number = 0;
  split2Time: string = "";
  split2Gap: string = "";
  split3Rank: number = 0;
  split3Time: string = "";
  split3Gap: string = "";
  split4Rank: number = 0;
  split4Time: string = "";
  split4Gap: string = "";
  split5Rank: number = 0;
  split5Time: string = "";
  split5Gap: string = "";
  finishRank: number = 0;
  finishTime: string = "";
  finishGap: string = "";
  currentSplitName: string = "";
  currentSplitRank: number = 0;
  currentSplitTime: string = "";
  currentSplitGap: string = "";
  swim: string = "";
  transition: string = "";
  run: string = "";
  totalTime: string = "";

  constructor(raceResult?: ILiveResult | ILiveResult) {
    super(raceResult);
    if (raceResult) {
      this.split1Rank = raceResult.Split1Rank;
      this.split1Time = raceResult.Split1Time; //time
      this.split1Gap = raceResult.Split1Gap; // "-" if first or "+$min:$sec"
      this.split2Rank = raceResult.Split2Rank;
      this.split2Time = raceResult.Split2Time;
      this.split2Gap = raceResult.Split2Gap;
      this.split3Rank = raceResult.Split3Rank;
      this.split3Time = raceResult.Split3Time;
      this.split3Gap = raceResult.Split3Gap;
      this.split4Rank = raceResult.Split4Rank;
      this.split4Time = raceResult.Split4Time;
      this.split4Gap = raceResult.Split4Gap;
      this.split5Rank = raceResult.Split5Rank;
      this.split5Time = raceResult.Split5Time;
      this.split5Gap = raceResult.Split5Gap;
      this.finishRank = raceResult.FinishRank;
      this.finishTime = raceResult.FinishTime;
      this.finishGap = raceResult.FinishGap;
      this.currentSplitName = raceResult.CurrentSplitName;
      this.currentSplitRank = raceResult.CurrentSplitRank;
      this.currentSplitTime = raceResult.CurrentSplitTime;
      this.currentSplitGap = raceResult.CurrentSplitGap;
      this.swim = raceResult.Swim;
      this.transition = raceResult.Transition;
      this.run = raceResult.Run;
    }
  }
  isStageWinner(stageId?: number): boolean {
    if (this.finishRank === 1)
      return true;
    return false;
  }
  isHighlighted(): boolean {
    if (this.currentSplitRank == 1) {
      return true;
    }
    return false;
  }
  setTotalTime(totalTime: string): void {
    this.totalTime = totalTime;
  }


}
