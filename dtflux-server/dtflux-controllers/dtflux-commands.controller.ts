import express, { Router, Request, Response } from "express";
import path from "path";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";

export class CommandController {
  private _router: Router;

  constructor(private _dtfluxDbService: DTFluxDbService) {
    this._router = express.Router();
    this.setupRoutes();
    this.mountCommandControllers();
  }

  private setupRoutes(): void {
    // Define your command routes here
    this._router.get("/:logiciel/:protocol", this.handleCommand);
  }

  private handleCommand = (req: Request, res: Response): void => {
    // Handle the command based on the logiciel and protocol
    const logiciel = req.params.logiciel;
    const protocol = req.params.protocol;
    const commandControllerPath = path.join(
      __dirname,
      `./command/${logiciel}.${protocol}.controller.ts`
    );

    try {
      const CommandControllerClass = require(commandControllerPath)
        .CommandController;
      const commandController = new CommandControllerClass(
        this._dtfluxDbService
      );
      const command = req.body;
      // Handle the command here
      res.json({ logiciel, protocol, command });
    } catch (error) {
      res.status(404).json({ error: "Controller not found" });
    }
  };

  private mountCommandControllers(): void {
    // Automatically mount command controllers if they exist in the 'command' folder
    // You may need to modify this part based on your specific folder structure
    const commandControllerPath = path.join(__dirname, "./command");
    const fs = require("fs");
    fs.readdirSync(commandControllerPath).forEach((file: string) => {
      if (file.endsWith(".controller.ts")) {
        const logiciel = file.split(".")[0];
        const protocol = file.split(".")[1];
        this._router.use(`/${logiciel}/${protocol}`, this.handleCommand);
      }
    });
  }

  get router(): Router {
    return this._router;
  }
}
