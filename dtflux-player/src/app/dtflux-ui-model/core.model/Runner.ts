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

  constructor(raceResult?: any) {
    if (raceResult) {
      this.contestId = raceResult.ContestID;
      this.stageId = raceResult.StageID;
      this.gender = raceResult.Gender;
      this.bib = raceResult.Bib;
      this.firstName = raceResult.Firstname;
      this.lastName = raceResult.Lastname;
      this.firstName2 = raceResult.Firstname2;
      this.lastName2 = raceResult.Lastname2;
      if ("Status" in raceResult) {
        this.status = raceResult.Status;
      }
      this.photo = this.bib + ".png";
    }
  }
}
