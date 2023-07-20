import * as net from "net";
import * as conf from "../dtflux-conf/conf.json";
import { Observable, Subject } from "rxjs";
import { IExporterResult } from "../dtflux-model/race-result.model/IExporterResult";
import { DTFluxDbService } from "./dtflux-database.service";
import { Collection } from "lokijs";
import { RunnerResult, RunnerResults } from "../dtflux-model/core.model/RunnerResults";
import { ExporterResult } from "../dtflux-model/race-result.model/ExporterResult";
import { StageFinishers } from "../dtflux-model/core.model/StageFinishers";
import { DTFluxWebSocketService } from "./dtflux-websocket.service";

export interface IExporterMessage{
  spotters?: RunnerResults;
  maxSpotters: number; // default to 4 max spotters
  finisher: RunnerResults;
  maxFinisher: number; // default to 4 max
  winner: RunnerResult;
}
export class DTFluxExporterService {
  private _exporterMessage: any;
  private _dbService: DTFluxDbService;
  server: net.Server;
  port: number;
  addr: string;
  private _changeSubject = new Subject<any>();
  private _stageFinisher: StageFinishers = new StageFinishers();
  private _websocketService: DTFluxWebSocketService;



  constructor(dbService: DTFluxDbService, private _websocketService: DTFluxWebSocketService) {
    this._websocketService = _websocketService;
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
          this.dispatch(jsonData);
          // if(jsonData.CurrentSplitName !== "Arrivée")
          console.log("data received in exporter service");
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
    console.log(this._stageFinisher);
    this._changeSubject.next(this._stageFinisher);
    this._websocketService.
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