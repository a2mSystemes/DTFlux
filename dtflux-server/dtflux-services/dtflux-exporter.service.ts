import * as net from "net";
import * as conf from "../dtflux-conf/conf.json";
import { Observable, Subject } from "rxjs";
import { IExporterResult } from "../dtflux-model/race-result.model/IExporterResult";
import { DTFluxDbService } from "./dtflux-database.service";
import { Collection } from "lokijs";
import { RunnerResult, RunnerResults } from "../dtflux-model/core.model/RunnerResults";
import { ExporterResult } from "../dtflux-model/race-result.model/ExporterResult";

export interface IExporterMessage{
  spotters?: RunnerResults;
  maxSpotters: number; // default to 4 max spotters
  finisher: RunnerResults;
  maxFinisher: number; // default to 4 max
  winner: RunnerResult;
}
export class StageFinishers{
  static spotterKeyword: string = "Dernière ligne droite"; 
  static finishKeyword: string = "Arrivée"; 
  spotters: RunnerResults = new RunnerResults();
  maxSpotters: number = 4; // default to 4 max spotters
  finishers: RunnerResults = new RunnerResults();
  maxFinisher: number = 4; // default to 4 max
  winner: RunnerResult = new RunnerResult();
  addExporterData(jsonData: any) {
    const runner = new RunnerResult(jsonData);
    // it's a finisher
    if (runner.currentSplitName === StageFinishers.finishKeyword){
      const finisherBib = runner.bib
      this.finishers.push(runner);
      const finishBib = runner.bib;
      this.removeSpotter(finishBib);
      setTimeout(() => {
        this.removeFinisher(finishBib);
      }, conf.displayFinisherTime) //TODO: not hardcoded
    }
  }

  removeFinisher(finishBib: number) {
    const copyArray = new RunnerResults();
    for(let runner of this.finishers){
      if(runner.bib !== finishBib){
        copyArray.push(runner);
      }
    }
    this.spotters = copyArray;
  }
  removeSpotter(spotterBib: number) {
    const copyArray = new RunnerResults();
    for(let runner of this.spotters){
      if(runner.bib !== spotterBib){
        copyArray.push(runner);
      }
    }
    this.spotters = copyArray;
  }
}

export class DTFluxExporterService {
  private _exporterMessage: any;

  private _dbService: DTFluxDbService;
  server: net.Server;
  port: number;
  addr: string;
  private _changeSubject = new Subject<any>();
  private _stageFinisher: StageFinishers = new StageFinishers();



  constructor(dbService: DTFluxDbService) {
    this._dbService = dbService;
    this.port = conf.exporterPort ? conf.exporterPort : 3000;
    this.addr = conf.exporterHost ? conf.exporterHost : "localhost";
    this.server = new net.Server(this.connectionListen.bind(this));
    this.listen();
  }

  connectionListen(socket: net.Socket) {
    let rawData = Buffer.alloc(0);
    // Handle incoming data
    socket.on("connect", () => {
      console.log("client connected");
    });
    socket.on("data", (data) => {
      // Append received data to the raw buffer
      rawData = Buffer.concat([rawData, data]);
      if (rawData.slice(-2).toString() === "\r\n") {
        try {
          // let jsonBuffer = rawData.slice(0, -2);
          const jsonData = JSON.parse(rawData.toString());
          // this.dispatch(jsonData);
          if(jsonData.CurrentSplitName !== "Arrivée")
          console.log(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        } finally {
          rawData = Buffer.alloc(0);
        }
      }
    });
    // Handle end of data transmission
    socket.on("end", () => {
      console.log("Client disconnected");
    });
  }
  dispatch(jsonData: any) {
    this._stageFinisher.addExporterData(jsonData);
  }

  getChanges(): Observable<any> {
    return this._changeSubject.asObservable()
  }

  listen() {
    this.server.listen(this.port, this.addr, () => {
      console.log(
        `Listening Exporter on address ${this.addr} on port ${this.port} `,
      );
    });
  }
}