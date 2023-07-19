
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
}
