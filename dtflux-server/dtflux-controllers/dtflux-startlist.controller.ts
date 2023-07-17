import express, { Router, Request, Response } from "express";
import { DTFluxDbService } from "../dtflux-services/dtflux-database.service";
import { DTFLuxHTTPRequesterService } from "../dtflux-services/dtflux-http-requester.service";
import * as conf from "../dtflux-conf/conf.json";
import { error } from "console";
import { IParticipant } from "../dtflux-model/dtflux-schema.model";
import { Collection } from "lokijs";
import axios from "axios";
import { Participant, Team } from "../dtflux-services/dtflux-exporter.service";

export class StartListController {
  private _dbService: DTFluxDbService;
  private _router: any;
  private _requester: DTFLuxHTTPRequesterService =
    new DTFLuxHTTPRequesterService();

  constructor(dbService: DTFluxDbService) {
    this._dbService = dbService;
    this._router = express.Router();
    this.setupRoutes();
  }
  setupRoutes() {
    this._router.get("/load", this.load);
  }

  private handleError(res: Response, error: any): void {
    res.status(500).json({
      status: "NOK",
      route: "/start-list/load",
      error,
    });
  }

  private load = async (req: Request, res: Response): Promise<void> => {
    const APIConf = conf.raceResultAPI;
    const useLocal = APIConf.useLocal;
    let url = useLocal ? APIConf.baseLocalUrl + "/_" : APIConf.baseDistantUrl;
    url += APIConf.idEvent;
    url += useLocal ? "api/" : "";
    url += APIConf.resources.startListKey;
    try {
      const data: any = await this._requester.request(url);
      const startListResponse:Array<any> = data.data;
      const participants: Collection<any> | null =
        this._dbService.getCollection("participant");
      const teams: Collection<any> | null =
        this._dbService.getCollection("team");
        // console.log(participants);
      for (const startListItem of startListResponse) {
        if(Team.isTeam(startListItem) ){
          // we are in a relay
          const team = new Team(startListItem);
          Team.participantsInDb(team)
        }
        if (participants && teams ) {
          try {
            // const team = teams.findOne()
            const participant = participants.findOne({
              bib: startListItem.Bib,
              lastName: startListItem.Lastname,
              firstName: startListItem.Firstname,
            });
            let newParticipant = null;
            if (!participant){ // participant does not exist
              //handle if the participant is only in a team

              const doc:IParticipant = {
                id: undefined,
                lastName: startListItem.Lastname,
                firstName: startListItem.Firstname,
                gender: startListItem.Gender,
                bib: startListItem.Bib,
                category: startListItem.Category,
                currentStatusId: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              console.log("doc", doc);
              newParticipant = participants.insertOne(doc);
            }else{

              console.log(`participants: ${participant} already exists`);
            }
          } catch (error) {
            
          }
        }
      }
      this._dbService.save();
      // console.log(response);
      res.status(200).json({ loaded: true, url: url });
    } catch (error) {
      console.log(error);
      this.handleError(res, error);
    }
  };

  get router(): Router {
    return this._router;
  }
}
