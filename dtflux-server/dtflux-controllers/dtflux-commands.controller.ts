import express, { Router, Request, Response } from "express";
import path from "path";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFluxSelectionService } from "../dtflux-services/dtflux-selection.service";
import { DTFluxMilluminService } from "../dtflux-services/dtflux-millumin.service";
import * as conf from './../dtflux-conf/conf.json';

export class CommandController {
  private _router: Router;
  private _milluminService: DTFluxMilluminService = new DTFluxMilluminService(conf.mulluminIp, conf.mulluminPort);


  constructor(private _selectionService: DTFluxSelectionService) {
    this._router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Define your CRUD routes here
    this._router.get("/contest/change/:contestId", this.modifyContestId);
    this._router.get("/stage/change/:stageId", this.modifyStageId);
    this._router.get("/millumin/play/col/:colNum", this.executeMilluminCommandPlay)
    this._router.get("/millumin/mute", this.executeMilluminCommandMute)
    this._router.get("/millumin/audio/volume/up/:level?", this.executeMilluminCommandLevelUp)
    this._router.get("/millumin/audio/volume/down/:level?", this.executeMilluminCommandLevelDown);

  }

  private modifyContestId = (req: Request, res: Response): void => {
    console.log("Modifying contest id: ");
    const contestId = !Number.isNaN(req.params.contestId) ? Number(req.params.contestId) : -1;
    this._selectionService.setContest(contestId);
    res.status(200).json({ response: "OK", currentContestId: contestId });

  };
  private modifyStageId = (req: Request, res: Response): void => {
    const stageId = !Number.isNaN(req.params.stageId) ? Number(req.params.stageId) : -1;
    this._selectionService.setStage(stageId);
    res.status(200).json({ response: "OK", currentStageId: stageId });
  };

  executeMilluminCommandPlay = (req: Request, res: Response): void => {
    const col = Number(req.params.colNum);
    if (!isNaN(col)) {
      this._milluminService.playColumn(col);
      res.status(200).json({ response: "done", col: col, command: "play" });
    }
    res.status(404).json({ response: "error col not found", col: col, command: "play" });
  };
  executeMilluminCommandMute = (req: Request, res: Response): void => {
    this._milluminService.muteSound();
    res.status(200).json({ response: "done", mute: "mute", command: "mute" });
  };
  executeMilluminCommandLevelUp = (req: Request, res: Response): void => {
    let level = Number(req.params.level);
    if (!isNaN(level)) level = 2;
    this._milluminService.increaseVolume(level);
    res.status(200).json({ response: "done", level: level, command: "level-up" });
  };
  executeMilluminCommandLevelDown = (req: Request, res: Response): void => {
    let level = Number(req.params.level);
    if (!isNaN(level)) level = 2;
    this._milluminService.decreaseVolume(level);
    res.status(200).json({ response: "done", level: level, command: "level-down" });
  };

  private handleError(res: Response, error: string, crudOp: string): void {
    res.status(500).json({
      status: "NOK",
      error,
      crudOp,
      data: null
    });
  }

  get router(): Router {
    return this._router;
  }
}
