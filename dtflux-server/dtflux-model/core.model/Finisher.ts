import { EndingLapRunner } from "./EndingLapRunner";
import { IExporterResult } from "../race-result.model/IExporterResult";


export class Finisher extends EndingLapRunner {
  winner: boolean = false;

  constructor(jsonData?: IExporterResult) {
    super(jsonData);
    this.type = "finisher";
  }
}
