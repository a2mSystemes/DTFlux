import { IRunner } from "./IRunner";


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
  photo: string = "0.png";

  constructor(liveResult?: any) {
    if (liveResult ) {
      Object.assign(this, liveResult);
    }

  }
}
