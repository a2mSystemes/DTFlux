import express, { Application } from "express";
import { DTFluxDbService } from "./dtflux-services/dtflux-database.service";
import { DTFluxWebSocketService } from "./dtflux-services/dtflux-websocket.service";
import { CrudController } from "./dtflux-controllers/dtflux-crud.controller";
import { CommandController } from "./dtflux-controllers/dtflux-commands.controller";
import { WebsocketController } from "./dtflux-controllers/dtflux-websocket.controller";
import { StartListController } from "./dtflux-controllers/dtflux-startlist.controller";
import path from "path";
import * as conf from "./dtflux-conf/conf.json";
import { Subscription } from "rxjs";
import {DTFluxExporterService} from './dtflux-services/dtflux-exporter.service'
import { DTFluxLiveResultService } from "./dtflux-services/dtflux-live-result.service";


export class App {
  private _expressApp: Application;
  private _dtfluxDbService: DTFluxDbService;
  private _dtfluxExporterService: DTFluxExporterService;
  private _dtfluxLiveResulService: DTFluxLiveResultService;


  constructor() {
    this._expressApp = express();
    this._dtfluxDbService = new DTFluxDbService(); // Replace with your database name
    this._dtfluxExporterService = new DTFluxExporterService(this._dtfluxDbService)
    this._dtfluxLiveResulService = new DTFluxLiveResultService();
    // Middleware to parse JSON data
    this._expressApp.use(express.json());

    // CRUD Controller
    const crudController = new CrudController(this._dtfluxDbService);
    this._expressApp.use(`${conf.baseUrl}/crud`, crudController.router);

    // Command Controller
    const commandController = new CommandController(this._dtfluxDbService);
    this._expressApp.use(`${conf.baseUrl}/commands`, commandController.router);

    const startlistController = new StartListController(this._dtfluxDbService);
    this._expressApp.use(`${conf.baseUrl}/start-list`, startlistController.router);


    // Websocket Controller
    const websocketController = new WebsocketController(
      this._dtfluxDbService,this._dtfluxExporterService, this._dtfluxLiveResulService
    );

    // this._expressApp.use("/dtflux-api/v1/ws", websocketController.router);

    // Serve static files for command controllers (if any)
    this._expressApp.use(
      "/static",
      express.static(path.join(__dirname, "dtflux-static"))
    );
  }

  get expressApp(): Application {
    return this._expressApp;
  }
}
