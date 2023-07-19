import { IExporterResult } from "./IExporterResult";
import { ILiveResult } from "./ILiveResult";

export interface DTFluxBase { }

export interface IRunner {
  contestId: number;
  stageId: number;
  bib: number;
  firstName: string;
  lastName: string;
  gender: string;
  firstName2: string;
  lastName2: string;
  status: '' | 'DNS' | 'DNF' | 'DSQ';
  photo: string;
}

export interface ITimingRunner {
  startTime: string;
  split1Rank: number;
  split1Time: string; //time
  split1Gap: string; // "-" if first or "+$min:$sec"
  split2Rank: number;
  split2Time: string;
  split2Gap: string;
  split3Rank: number;
  split3Time: string;
  split3Gap: string;
  split4Rank: number;
  split4Time: string;
  split4Gap: string;
  split5Rank: number;
  split5Time: string;
  split5Gap: string;
  finishRank: number;
  finishTime: string;
  finishGap: string;
  currentSplitName: string;
  currentSplitRank: number;
  currentSplitTime: string;
  currentSplitGap: string;
  swim: string;
  transition: string;
  run: string;
  totalTime: string;
  rank: number;
}
export class Runner implements IRunner {
  contestId: number = -1;
  stageId: number = -1;
  bib: number = -1;
  gender: string = "M";
  firstName: string = '';
  lastName: string = '';
  firstName2: string = '';
  lastName2: string = '';
  status: '' | 'DNS' | 'DNF' | 'DSQ' = '';
  photo: string;
  constructor(raceResult?: IExporterResult | ILiveResult){
    this.photo = this.bib + ".png";
    if(raceResult){
    this.contestId = raceResult.ContestID;
    this.stageId = raceResult.StageID;
    this.gender = raceResult.Gender;
    this.bib = raceResult.Bib;
    this.firstName = raceResult.Firstname;
    this.lastName = raceResult.Lastname;
    this.firstName2 = raceResult.Firstname2;
    this.lastName2 = raceResult.Lastname2;
    if("Status" in raceResult){
      this.status = raceResult.Status
    }
  }
}
}
export class RunnerResults{
  runners: Array<RunnerResult> = new Array<RunnerResult>();

  getRunnerResultBib(bib:number): RunnerResult | undefined{
    for(let runner of this.runners){
      if(runner.bib === bib){
        return runner;
      }
    }
    return undefined;
  }
  getRunnerResultBibIndex(bib:number): number{
    let index = 0
    for(let str in this.runners){
      if(this.runners[index].bib === bib){
        console.log(str);
        return index;
      }
      index++;
    }
    return -1;
  }

  getRunnerResultCurrentRank(rank:number): RunnerResult | undefined{
    for(let runner of this.runners){
      if(runner.currentSplitRank === rank){
        return runner;
      }
    }
    return undefined;
  }

  getRunnerResultRank(rank:number): RunnerResult{
    for(let runner of this.runners){
      if(runner.rank === rank){
        return runner;
      }
    }
    return new RunnerResult();
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
  rank: number = 0;

  constructor(raceResult?: ILiveResult | ILiveResult){
  super(raceResult);
  if(raceResult){
  this.split1Rank = raceResult.Split1Rank
  this.split1Time = raceResult.Split1Time; //time
  this.split1Gap = raceResult.Split1Gap; // "-" if first or "+$min:$sec"
  this.split2Rank = raceResult.Split2Rank;
  this.split2Time = raceResult.Split2Time;
  this.split2Gap = raceResult.Split2Gap;
  this.split3Rank = raceResult.Split3Rank;
  this.split3Time = raceResult.Split3Time;
  this.split3Gap = raceResult.Split3Gap;
  this.split4Rank = raceResult.Split4Rank
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

  setRank(rank: number): void {
    this.rank = rank;
  }


}


export interface ISpotters {
  runners: Array<IRunner>; // 0 = default 1 = femme quand mixte
}

export interface IFinishers {
  runners: Array<IRunner>; // 0 = default 1 = femme quand mixte
}

export interface IStarter extends IRunner {
  starttime: string | number; // A verifier
}

export interface IStarters {
  starters: Array<IStarter>;
}

export class Spotters implements ISpotters {
  runners: Array<IRunner> = new Array<IRunner>();

  getSpotter(name: string): IRunner | null {
    //research by name
    for (const runner of this.runners) {
      if ((runner.lastName = name || runner.lastName2) === name) return runner;
    }
    return null;
  }
}

const spotters: Spotters = new Spotters();
spotters.getSpotter('test');
//Course en cours telle que définie via la page control du serveur

export interface ICourse {
  contestId: number; //1 XPS relais, 2 XP, 3 XPS
  stageId: number; //1 Kilo, 2 Mega, 3 Giga, 4 Tera, 5 Peta
  startTime?: Date;
}

export class Course implements ICourse {
  contestId: number = -1;
  stageId: number = -1;
  startTime?: Date = new Date("12:55:00");
}
