import express, { Router, Request, Response } from "express";
import path from "path";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFluxSelectionService } from "../dtflux-services/dtflux-selection.service";

export class CommandController {
  private _router: Router;

  constructor(private _selectionService: DTFluxSelectionService) {
    this._router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Define your CRUD routes here
    this._router.get("/contest/change/:contestId", this.modifyContestId);
    this._router.get("/stage/change/:stageId", this.modifyStageId);

  }

  private modifyContestId = (req: Request, res: Response): void => {
    console.log("Modifying contest id: ");
    const contestId = !Number.isNaN(req.params.contestId)? Number(req.params.contestId) : -1;
    this._selectionService.setContest(contestId);
    res.status(200).json({response: "OK", currentContestId: contestId});

  };
  private modifyStageId = (req: Request, res: Response): void => {
    const stageId = !Number.isNaN(req.params.stageId)? Number(req.params.stageId) : -1;
    this._selectionService.setStage(stageId);
    res.status(200).json({response: "OK", currentStageId: stageId});
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
