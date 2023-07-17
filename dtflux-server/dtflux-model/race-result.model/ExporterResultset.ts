import { IEndingLapRunner } from "../core.model/IEndingLapRunner";
import { IExporterResultset } from "./IExporterResultset";


export class ExporterResultset implements IExporterResultset {
    spoters: Array<IEndingLapRunner> = new Array<IEndingLapRunner>();
    finishers?: Array<IEndingLapRunner>;
    winner?: IEndingLapRunner;
    receivedTimestamp: number = Date.now();

    constructor(data?: any) {
    }
}
