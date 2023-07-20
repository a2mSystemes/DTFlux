import { ILiveResult } from "../race-result.model/ILiveResult";
import { Runner } from "./Runner";
import { ITimingRunner } from "./ITimingRunner";
import { ExporterResult } from "../race-result.model/ExporterResult";





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
  rank: number = 0;
  constructor(liveResult?: any) {
    super(liveResult);
    if (liveResult) {
      Object.assign(this, liveResult);
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
static fromExporter(data: ExporterResult): RunnerResult | undefined {
  if(!data)
  return undefined;
  const ret = new RunnerResult();
  ret.bib = data.Bib;
  ret.contestId = data.ContestID;
  ret.firstName = data.Firstname;
  ret.firstName2 = data.Firstname2;
  ret.gender = data.Gender;
  ret.lastName = data.Lastname;
  ret.lastName2 = data.Lastname2;
  ret.startTime = data.StartTime;
  ret.startTime = data.StartTime;
  ret.currentSplitGap = data.CurrentSplitGap;
  ret.currentSplitRank = data.CurrentSplitRank;
  ret.currentSplitTime = data.CurrentSplitTime;
  ret.currentSplitName = data.CurrentSplitName;
  return ret;
}

}
