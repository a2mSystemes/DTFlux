import { FilteredArray } from "./FilteredArray";
import { RunnerResult } from "./RunnerResult";


export class RunnerResults extends FilteredArray<RunnerResult> {

  constructor(liveResultDatas?: Array<any>) {
    super()
    if (liveResultDatas) {
      for (let index = 0; index < liveResultDatas.length; index++) {
        this.push(new RunnerResult(liveResultDatas[index]));
      }
    }
  }
  getRunnerResultBib(bib: number): RunnerResult | undefined {
    for (let index = 0; index < this.length; index++) {
      if (this[index].bib === bib) {
        return this[index];
      }
    }
    return undefined;
  }
  getRunnerResultBibIndex(bib: number): number {
    for (let index = 0; index < this.length; index++) {
      if (this[index].bib === bib) {
        return index;
      }
    }
    return -1;
  }

  getRunnerResultRank(rank:number): RunnerResult{
    for (let index = 0; index < this.length; index++) {
      if(this[index].rank === rank) {
        return this[index];
      }
    }
    return new RunnerResult();
  }
}



