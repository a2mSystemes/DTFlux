import { Observable, Subscription } from "rxjs";
import WebSocket, { Server, Server as WebSocketServer } from "ws";
import * as conf from "./../dtflux-conf/conf.json";
import { DTFluxDbService } from "./dtflux-database.service";
import { IncomingMessage } from "http";
import { DTFluxExporterService } from "./dtflux-exporter.service";
import { DTFluxLiveResultService } from "./dtflux-live-result.service";



export class DTFluxWebSocketService extends WebSocketServer {
  private static _wsIDs = 0;
  private _routes: Array<string> = [];
  private _dbSubscription: Subscription;
  private _exporterSubscription: Subscription;
  private _liveResultSubscription: Subscription;
  private _db:DTFluxDbService;
  private _routesWs: Map<string,Array<WebSocket>> = new Map<string,Array<WebSocket>>()
  private _dataSenders: Map<string, Array<WebSocket>> = new Map<string, Array<WebSocket>>


  constructor(db: DTFluxDbService, exporter_s: DTFluxExporterService, liveResult_s: DTFluxLiveResultService) {
    let path = "/ws";
    if(conf.wsPath && conf.baseUrl)
      path = conf.baseUrl + conf.wsPath;
    super({ port: conf.wsPort ? conf.wsPort : 5001, path: path });
    this._db = db;
    this._dbSubscription = this._db.getChanges().subscribe({
      next: (data) => {
        for(let client of this.clients){
          client.send(JSON.stringify(data));
        }
      }
    });
    this._exporterSubscription = exporter_s.getChanges().subscribe({next: (data)=>{}}) 
    this._liveResultSubscription = liveResult_s.getChanges().subscribe({next: (data)=>{}}) 

    this.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      const path = req.url ? 'ws://localhost' + req.url : "ws://localhost";
      const url = new URL('ws://localhost' + path)
      const params = url.searchParams;
      this.dispatchClient(ws, params);
      ws.send(JSON.stringify({response : "OK"}));
      // save it to the container
      ws.on("message", (data: Buffer) => {
        let req = data.toString();
        try {
          this.handleMessage(JSON.parse(req), ws);
        } catch (error) {
          console.error("Invalid JSON:", error);
          return;
        }
      });
    });
    // console.log(this);
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
    for(let route of params.getAll("routes")) {
      if(this._routesWs.has(route)){
        this._routesWs.get(route)?.push(ws);
      }
    }
    console.log(this._routesWs)
  }

  handleMessage(data: any, ws: WebSocket) {
    let r = data.route;
    try {
      delete data["route"];
      data.poweredBy = "DTFluxWebSocket";
      data.ws = ws;
    //   console.log(r);
    } catch (error) {
      console.log("Invalid REQUEST:", error);
    }
    for (let route of this._routes) {
      if (route === r) {
        console.log("emiting route");
        ws.emit(route, data);
        this.emit(route, data);
      }
    }
  }

  addRoute(route: string, out?: boolean): this {
    console.log(`adding ${route}`);
    if(out){

    }else{
      this._routesWs.set(route, new Array<WebSocket>());
    }
    return this;
  }


}
