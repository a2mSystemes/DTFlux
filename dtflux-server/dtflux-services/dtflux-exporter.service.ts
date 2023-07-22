import * as net from "net";
import * as conf from "../dtflux-conf/conf.json";
import { Observable, Subject } from "rxjs";
import { DTFluxDbService } from "./dtflux-database.service";
import { StageFinishers } from "../dtflux-model/core.model/StageFinishers";
import { DTFluxWebSocketService } from "./dtflux-websocket.service";
import { RunnerResult } from "../dtflux-model/core.model/RunnerResult";
export class DTFluxExporterService {
  server: net.Server;
  port: number;
  addr: string;
  private _changeSubject = new Subject<any>();

  constructor( ) {
    this.port = conf.exporterPort ? conf.exporterPort : 3000;
    this.addr = conf.exporterHost ? conf.exporterHost : "localhost";
    this.server = new net.Server(this.connectionListen.bind(this));
    this.listen();
  }

  connectionListen(socket: net.Socket) {
    let rawData = Buffer.alloc(0);
    socket.on("connect", () => {
      // console.log("client connected");
    });
    socket.on("data", (data) => {
      rawData = Buffer.concat([rawData, data]);
      if (rawData.slice(-2).toString() === "\r\n") {
        try {
          let jsonBuffer = rawData.slice(0, -2);
          const jsonData = JSON.parse(jsonBuffer.toString());
          this.dispatch(jsonData);
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


  dispatch(data: any) {
    // console.log(RunnerResult.fromExporter(data));
    this._changeSubject.next(RunnerResult.fromExporter(data));

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