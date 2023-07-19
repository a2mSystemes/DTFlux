import * as net from "net";
import * as conf from "../dtflux-conf/conf.json";
import { Observable, Subject } from "rxjs";
import { EndingLapRunner } from "../dtflux-model/core.model/EndingLapRunner";
import { IExporterResult } from "../dtflux-model/race-result.model/IExporterResult";
import { EndingLapRunners } from "../dtflux-model/core.model/EndingLapRunners";
import { IEndingLapRunner } from "../dtflux-model/core.model/IEndingLapRunner";
import { DTFluxDbService } from "./dtflux-database.service";
import { Collection } from "lokijs";

export class DTFluxExporterService {

  private _dbService: DTFluxDbService;
  server: net.Server;
  port: number;
  addr: string;
  private _changeSubject = new Subject<any>();



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
          let jsonBuffer = rawData.slice(0, -2);
          const jsonData: IExporterResult = JSON.parse(jsonBuffer.toString());
          this.dispatch(jsonData);
          // this.spoters.addRunner(jsonData)
          // this.spoter$.next(this.spoters.exportData());
          // const jsonObject:IExporterResult = jsonData;
          console.log("Received JSON data:");
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
  dispatch(jsonData: IExporterResult) {

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