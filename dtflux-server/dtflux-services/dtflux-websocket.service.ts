import { Observable, Subscription } from "rxjs";
import WebSocket, { Server, Server as WebSocketServer } from "ws";
import * as conf from "./../dtflux-conf/conf.json";
import { DTFluxDbService } from "./dtflux-database.service";


export class DTFluxWebSocketService extends WebSocketServer {
  private _routes: Array<string> = [];
  private _dbSubscription: Subscription;
  private _db:DTFluxDbService;
  constructor(db: DTFluxDbService) {
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
    this.on("connection", (ws) => {
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

  addRoute(route: string): this {
    console.log(`adding ${route}`);
    this._routes.push(route);
    return this;
  }


}
