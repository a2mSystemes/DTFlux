import { FilteredArray } from "./FilteredArray";
import { RunnerResult } from "./RunnerResult";


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

  getRunnerResultRank(rank:number): RunnerResult{
    for(let runner of this){
      if(runner.rank === rank){
        return runner;
      }
    }
    return new RunnerResult();
  }
}




