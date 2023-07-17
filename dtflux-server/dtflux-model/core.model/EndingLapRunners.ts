import { json } from "stream/consumers";
import { EndingLapRunner } from "./EndingLapRunner";
import { IEndingLapRunner } from "./IEndingLapRunner";
import { IExporterResult } from "../race-result.model/IExporterResult";
import { Spoter } from "./Spoter";
import { LapFinisher } from "./LapFinisher";
import { Finisher } from "./Finisher";

export class EndingLapRunners{
  private spoters: Array<EndingLapRunner> = new Array<EndingLapRunner>();
  private lapFinishers: Array<EndingLapRunner> = new Array<EndingLapRunner>();
  private finishers: Array<EndingLapRunner> = new Array<EndingLapRunner>();
  private winner?: EndingLapRunner;

  exportData(): Array<IEndingLapRunner> {
    const ret = new Array<IEndingLapRunner>();
    let i = 1;
    for (let spoter of this.spoters) {
      ret.push(spoter.exportData());
      if (i === 4) break; // limit to 4 spoters
      i++;
    }
    // console.log(ret);
    return ret;
  }

  addRunner(jsonData: IExporterResult) {
    this.dispatchRunner(jsonData);
    this.spoters.push(new EndingLapRunner(jsonData));
    console.log(`new spoters size ${this.spoters.length}`);
    console.log(`new spoters size ${this.spoters.length}`);
  }

  dispatchRunner(jsonData: IExporterResult) {
    console.log(jsonData);
    if (jsonData.CurrentSplitName.includes("Dernière ligne droite")) {
      const runner = new Spoter(jsonData);
      console.log(`create new spoter ${runner.lastName}`);
      this.spoters.push(runner);
    }
    if (jsonData.CurrentSplitName.includes("Arrivée")) {
      // check if it is the last stage
      if (jsonData.StageName === ""){

      }
      this.promoteSpoter(jsonData);
    }
  }

  promoteSpoter(jsonData: IExporterResult) {
    this.removeSpoter(jsonData.Bib);
    const lapFinisher = new LapFinisher(jsonData);
    this.lapFinishers.push(lapFinisher);
  }

  promoteLapFinisher(jsonData: IExporterResult) {
    this.removeLapFinisher(jsonData.Bib);
    const finisher = new Finisher(jsonData);
    this.finishers.push(finisher);
  }

  removeRunner(bib: number, runnerType: "spoter" | "lapFinisher" | "finisher") {
    let index = 0;
    for (let spoter of this.spoters) {
      if (spoter.bib === bib) {
        this.spoters.splice(index, 1);
        break;
      }
      index++;
    }
  }

  removeSpoter(bib: number) {
    let index = 0;
    this.removeRunner(bib, "spoter");
  }

  removeLapFinisher(bib: number) {
    this.removeRunner(bib, "lapFinisher");
  }
}


const ExporterDataTest = {
    ContestID: 1,
    ContestName: 'YOTTA XPS RELAIS',
    StageID: 3,
    StageName: 'Giga XPS',
    Bib: 209,
    Firstname: 'Sami',
    Lastname: 'Driss',
    Gender: 'M',
    Club: 'TEAM YOTTA',
    Firstname2: 'Jules',
    Lastname2: 'Goudard',
    Gender2: 'M',
    Club2: '',
    TeamName: '',
    Category: 'Hommes',
    StartTime: '13:20:00',
    CurrentSplitName: 'Arrivée',
    CurrentSplitRank: 256,
    CurrentSplitTime: '17:18',
    CurrentSplitGap: '+3:00'
  }