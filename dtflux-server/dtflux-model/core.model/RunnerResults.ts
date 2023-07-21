import { FilteredArray } from "./FilteredArray";
import { RunnerResult } from "./RunnerResult";


export class RunnerResults extends FilteredArray<RunnerResult> {

  constructor(liveResults?: any) {
    super();
    if (liveResults) {
      for (let liveResult of liveResults) {
        this.push(new RunnerResult(liveResult));
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




