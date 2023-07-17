import { IEndingLapRunner } from "../core.model/IEndingLapRunner";

// Datamodel exported to Angular when received from Race Result Exporter
export interface IExporterResultset{
    spoters: Array<IEndingLapRunner>, 
    finishers?: Array<IEndingLapRunner>,
    winner?: IEndingLapRunner,
    receivedTimestamp: number
}