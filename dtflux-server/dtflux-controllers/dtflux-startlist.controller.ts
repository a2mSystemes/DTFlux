import express, { Router, Request, Response } from "express";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFLuxHTTPRequesterService } from "../dtflux-services/dtflux-http-requester.service";
import * as conf from "../dtflux-conf/conf.json";
import { error } from "console";
import { ICurrentServerState, IParticipant } from "../dtflux-model/dtflux-schema.model";
import { Collection } from "lokijs";
import axios from "axios";
import { DTFluxURLBuilderService } from "./../dtflux-services/dtflux-url-builder.service";

export class StartListController {
  private _dbService: DTFluxDbService;
  private _router: any;
  private _requester: DTFLuxHTTPRequesterService =
    new DTFLuxHTTPRequesterService();
  private _urlBuilder: DTFluxURLBuilderService = new DTFluxURLBuilderService();
  constructor(dbService: DTFluxDbService) {
    this._dbService = dbService;
    this._router = express.Router();
    this.setupRoutes();
  }
  setupRoutes() {
    this._router.get("/load", this.go);
  }

  private handleError(res: Response, error: any): void {
    res.status(500).json({
      status: "NOK",
      route: "/start-list/load",
      error,
    });
  }
  private go = async (
    req: Request,
    res: Response,
    error: any,
  ): Promise<void> => {
    await this.load().then(() => {
      console.log("done...");
      res.status(200).json({ message: "OK" });
    });
    return;
  };

  async load(): Promise<any> {
    const sState = this._dbService.getCollection("currentServerState");
    const currentState = sState?.findOne({ active: true }); // server is stopped
    console.log("no-states");
    console.log(currentState);

    if (!currentState) {
      const url = this._urlBuilder.buildURL("LiveResult");
      const liveResponse:any = await this._requester.request(url);
      console.log(typeof liveResponse);
      const contests = new Array<string>;
      let prevLength = 0;
      for(const item of liveResponse.data){
        // console.log(item);
        contests[item.ContestID] = item.ContestName;
        console.log("prevLength", prevLength);
        console.log("contests.length", contests.length);
        console.log(item.ContestID);
        console.log(contests[item.ContestID]);
        if(prevLength < contests.length){
          // il peut être inserer
          const obj:ICurrentServerState = {
            id: undefined,
            stageId: item.ContestName,
            contestId: item.ContestId,
            active: false,
            createdAt: new Date(),
          }
          console.log(obj);
          sState?.insert({obj});
        }
        prevLength = contests.length;
      }
    }
  }

  get router(): Router {
    return this._router;
  }
}
