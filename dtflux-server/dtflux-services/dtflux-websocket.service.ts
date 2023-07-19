import { Observable, Subject, Subscription } from "rxjs";
import WebSocket, { Server, Server as WebSocketServer } from "ws";
import * as conf from "./../dtflux-conf/conf.json";
import { DTFluxDbService } from "./dtflux-database.service";
import { IncomingMessage } from "http";
import { DTFluxExporterService } from "./dtflux-exporter.service";
import { DTFluxLiveResultService } from "./dtflux-live-result.service";
import { subscribe } from "diagnostics_channel";



export class DTFluxWebSocketService extends WebSocketServer {
  private static _wsIDs = 0;
  private _routes: Array<string> = [];
  private _exporterService: DTFluxExporterService;
  private _liveResultService: DTFluxLiveResultService;
  // private _db:DTFluxDbService;
  private _routesWs: Map<string,Subject<any>> = new Map<string,Subject<any>>();
  private _dataSenders: Map<string, Array<WebSocket>> = new Map<string, Array<WebSocket>>


  constructor(db: DTFluxDbService, exporter_s: DTFluxExporterService, liveResult_s: DTFluxLiveResultService) {
    let path = "/ws";
    if(conf.wsPath && conf.baseUrl)
      path = conf.baseUrl + conf.wsPath;
    super({ port: conf.wsPort ? conf.wsPort : 5001, path: path });
    this._exporterService = exporter_s;
    this._liveResultService = liveResult_s;
    // this._liveResultService.getChanges().subscribe((data) => console.log("in WS Service" + data));

    this.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      
      const path = req.url ? 'ws://localhost' + req.url : "ws://localhost";
      const url = new URL('ws://localhost' + path);
      const params = url.searchParams;
      console.log("params", params);
      const channels = params.getAll("channel");
      for(let channel of channels) {
        if(channel === "exporter"){
          this._exporterService.getChanges().subscribe({next : (changes:any) => {
            console.log(changes);
            ws.send(JSON.stringify(changes));
          }});
        }
        if(channel === "live-result"){
          this._liveResultService.getChanges().subscribe({next : (changes:any) => {
            ws.send(JSON.stringify(changes));
          }});
        }
        if(channel === "timers"){
          
        }
        if(channel === "command"){
          
        }
      }
      // save it to the container
      ws.on("message", (data: Buffer) => {
        console.log(data.toString());
      });
    });
    // console.log(this);
    this._liveResultService.start();
  }

  cleanupDisconnectedClients():void {
    this.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) {
        // Le client est déconnecté, supprimez-le
        // this.removeClient(client);
      }
    });
  }

  dispatchClient(ws: WebSocket, params: URLSearchParams) {
    // for(let route of params.getAll("routes")) {
    //   if(this._routesWs.has(route)){
    //     this._routesWs.get(route)?.push(ws);
    //   }
    // }
    // console.log(this._routesWs)
  }

  handleMessage(data: any, ws: WebSocket) {
    console.log(JSON.stringify(data));
    // let r = data.route;
    // try {
    //   delete data["route"];
    //   data.poweredBy = "DTFluxWebSocket";
    //   data.ws = ws;
    // //   console.log(r);
    // } catch (error) {
    //   console.log("Invalid REQUEST:", error);
    // }
    // for (let route of this._routes) {
    //   if (route === r) {
    //     console.log("emiting route");
    //     ws.emit(route, data);
    //     this.emit(route, data);
    //   }
    // }
  }

  addRoute(route: string, subject:Subject<any>): this {
    console.log(`adding ${route}`);
    this._routesWs.set(route, subject);
    return this;
  }


}
