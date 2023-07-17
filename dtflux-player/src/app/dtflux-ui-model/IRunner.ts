export interface DTFluxBase {}
export interface IRunner {
  contestId: number;
  stageId: number;
  bib: () => number;
  firstName: string;
  lastName: string;
  firstName2: string;
  lastName2: string;
  status: '' | 'DNS' | 'DNF' | 'DSQ';
}

export interface ITimingRunner {
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
}

export class Runner implements IRunner {
  private _bib: number = -1;
  contestId: number = -1;
  stageId: number = -1;
  bib: () => number = () => {
    return this._bib;
  };
  firstName: string = '';
  lastName: string = '';
  firstName2: string = '';
  lastName2: string = '';
  status: '' | 'DNS' | 'DNF' | 'DSQ' = '';
}
export class RunnerResult extends Runner implements ITimingRunner {
  split1Rank: number = 0;
  split1Time: string = ""; //time
  split1Gap: string = ""; // "-" if first or "+$min:$sec"
  split2Rank: number = 0;
  split2Time: string= "";
  split2Gap: string= "";
  split3Rank: number = 0;
  split3Time: string= "";
  split3Gap: string= "";
  split4Rank: number = 0;
  split4Time: string= "";
  split4Gap: string= "";
  split5Rank: number = 0;
  split5Time: string= "";
  split5Gap: string= "";
  finishRank: number = 0;
  finishTime: string= "";
  finishGap: string= "";
  currentSplitName: string= "";
  currentSplitRank: number = 0;
  currentSplitTime: string= "";
  currentSplitGap: string= "";
  swim: string= "";
  transition: string= "";
  run: string= "";
  totalTime: string= "";
}

const runnerResult = new RunnerResult();
runnerResult.swim;

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
