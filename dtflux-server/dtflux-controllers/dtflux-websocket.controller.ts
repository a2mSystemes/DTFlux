import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFluxWebSocketService } from "../dtflux-services/dtflux-websocket.service";
import { WebSocket } from "ws";

export class WebsocketController {
  private _dtfluxWebSocketService: DTFluxWebSocketService;

  constructor(dataBaseService: DTFluxDbService) {
    this._dtfluxWebSocketService = new DTFluxWebSocketService(dataBaseService);
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this._dtfluxWebSocketService.addRoute("/create").on("create", (req, res) => {
      console.log("create route");
    });
    this._dtfluxWebSocketService.addRoute("route2");
    // Ajoutez d'autres routes WebSocket ici
  }
}
