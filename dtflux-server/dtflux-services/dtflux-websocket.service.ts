import { Observable, Subject, Subscription } from "rxjs";
import WebSocket, { Server, Server as WebSocketServer } from "ws";
import * as conf from "./../dtflux-conf/conf.json";
import { DTFluxDbService } from "./dtflux-database.service";
import { IncomingMessage } from "http";
import { DTFluxExporterService } from "./dtflux-exporter.service";
import { DTFluxLiveResultService } from "./dtflux-live-result.service";
import { subscribe } from "diagnostics_channel";
import { StageFinishers } from "../dtflux-model/core.model/StageFinishers";
import { RunnerResult } from "../dtflux-model/core.model/RunnerResult";



export class DTFluxWebSocketService extends WebSocketServer {
  private _exporterService: DTFluxExporterService;
  private _liveResultService: DTFluxLiveResultService;
  // private _db:DTFluxDbService;
  private _routesWs: Map<string, Subject<any>> = new Map<string, Subject<any>>();
  handleLiveResultRequest: any;


  constructor(db: DTFluxDbService, exporter_s: DTFluxExporterService, liveResult_s: DTFluxLiveResultService) {
    let path = "/ws";
    if (conf.wsPath && conf.baseUrl)
      path = conf.baseUrl + conf.wsPath;
    super({ port: conf.wsPort ? conf.wsPort : 5001, path: path });
    this._exporterService = exporter_s;
    
    this._liveResultService = liveResult_s;
    // this._liveResultService.getChanges().subscribe((data) => console.log("in WS Service" + data));

    this.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      ws.send(JSON.stringify({ connected: true }));
      const path = req.url ? 'ws://localhost' + req.url : "ws://localhost";
      const url = new URL('ws://localhost' + path);
      const params = url.searchParams;
      const channels = params.getAll("channel");
      for (let channel of channels) {
        if (channel === "exporter") {
      this._exporterService.getChanges()
      .subscribe({
        next: (stageFinisher: any) => {
          // console.log("sending stageFinisher");
          // console.log(stageFinisher)
          ws.send(JSON.stringify(stageFinisher));
        }
      })
        }
        if (channel === "live-result") {
          this._liveResultService.getChanges().subscribe({
            next: (changes: any) => {
              // console.log(changes)
              ws.send(JSON.stringify(changes));
            }
          });
        }
        if (channel === "timers") {

        }
        if (channel === "command") {

        }
      }
      // save it to the container
      ws.on("message", (data) => {
        console.log(data);
        try {
          let req = JSON.parse(data.toString());
          console.log(req);
          switch (req.channel) {
            case "timers":
              this.handleTimerRequest(req);
              break;
            case "commands":
              this.handleCommandsRequest(req, ws);
              break;
            case "exporter":
              this.handleExporterRequest(req);
              break;
            case "live-result":
              this.handleLiveResultRequest(req);
              break;
            case "general-classification":
              this.handleGeneralClassificationRequest(req);
              break;
            case "db":
              this.handleGeneralClassificationRequest(req);
              break;
            default:
              console.log(data.toString());
              break;

          }
        } catch (e) {
          console.error(e);
        }
      });
    });
    // console.log(this);
    this._liveResultService.start();
  }
  handleGeneralClassificationRequest(req: any) {
    console.log("General classification Request Message : ");
    console.log(req);
  }
  handleExporterRequest(req: any) {
    console.log("Exporter Request Message : ");
    console.log(req);
  }
  handleCommandsRequest(req: any, ws: WebSocket) {
    console.log("Commands Request Message : ");
    console.log(req);
    for (let client of this.clients) {
      client.send(JSON.stringify(req));
    }

  }
  handleTimerRequest(req: any) {
    console.log("Timer Request Message : ");
    console.log(JSON.stringify(req));
  }


  addRoute(route: string, subject: Subject<any>): this {
    console.log(`adding ${route}`);
    this._routesWs.set(route, subject);
    return this;
  }


}
