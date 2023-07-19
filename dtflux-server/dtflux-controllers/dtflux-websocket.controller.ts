import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFluxExporterService } from "../dtflux-services/dtflux-exporter.service";
import { DTFluxLiveResultService } from "../dtflux-services/dtflux-live-result.service";
import { DTFluxWebSocketService } from "../dtflux-services/dtflux-websocket.service";
import { WebSocket } from "ws";

export class WebsocketController {
  private _dtfluxWebSocketService: DTFluxWebSocketService;

  constructor(
    dataBaseService: DTFluxDbService,
    exporter: DTFluxExporterService,
    liveResult: DTFluxLiveResultService,
  ) {
    this._dtfluxWebSocketService = new DTFluxWebSocketService(
      dataBaseService,
      exporter,
      liveResult,
    );
    this.setupOutgoingRoutes();
  }

  private setupOutgoingRoutes(): void {
    // this._dtfluxWebSocketService.addRoute("exporter", this.);
    // this._dtfluxWebSocketService.addRoute("live-result");
    // this._dtfluxWebSocketService.addRoute("db");
    // this._dtfluxWebSocketService.addRoute("command");
    // Ajoutez d'autres routes WebSocket ici
  }

  private setupIncomingRoutes(): void {
    // this._dtfluxWebSocketService.addRoute("start", true);
  }
}
