import { IEndingLapRunner } from "./IEndingLapRunner";
import { IExporterResult } from "../race-result.model/IExporterResult";


export class EndingLapRunner implements IEndingLapRunner {
  id!: number;
  category: string = "";
  currentStatusId!: number;
  createdAt: Date = new Date();
  updatedAt!: Date;
  lastName: string;
  firstName: string;
  bib: number;
  currentSplitName: string;
  currentSplitTime: string;
  currentSplitGap: string;
  currentSplitRank: number;
  spotRank: number = 0;
  gender: string;
  runnerType: "solo" | "relai" = "solo";
  type: "spoter" | "lapFinisher" | "finisher" | "" = "";


  constructor(data?: IExporterResult) {
    this.lastName = data ? data.Lastname : "";
    this.firstName = data ? data.Firstname : "";
    this.bib = data ? data.Bib : -1;
    this.currentSplitName = data ? data.CurrentSplitName : "";
    this.currentSplitTime = data ? data.CurrentSplitName : "";
    this.currentSplitGap = data ? data.CurrentSplitGap : "";
    this.currentSplitRank = data ? data.CurrentSplitRank : -1;
    this.gender = data ? data.Gender : "";
    this.runnerType = data && data.Lastname2 !== "" ? "relai" : "solo";
  }


  upgradeRank(): void {
    this.spotRank++;
  }

  exportData(): IEndingLapRunner {
    return { ...this };
  }
}
