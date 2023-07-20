import { Subscription } from "rxjs";
import * as conf from "./../dtflux-conf/conf.json";
import { DTFluxSelectionService } from "./dtflux-selection.service";
export class DTFluxURLBuilderService {
  private _stageId:number = 1
  private _contestId: number = 1;
  private _stageSub: Subscription;
  private _contestSub: Subscription;
  constructor(selectionService: DTFluxSelectionService) {
    this._stageSub = selectionService.getStageObservable().subscribe(stageId => this._stageId = stageId);
    this._contestSub = selectionService.getContestObservable().subscribe(contestId => this._contestId = contestId);
  }

  buildURL(
    what: "StratList" | "LiveResult" | "GenClasification" = "LiveResult",
    contestId?: number,
    filters?: any,
  ): string {
    what = what ? what : "LiveResult";
    let c = conf.raceResultAPI as any;
    let url = c.useLocal ? c.baseLocalUrl + "/_" : c.baseDistantUrl;
    url += c.idEvent;
    url += c.useLocal ? "api/" : "";
    switch (what) {
      case "GenClasification":
        url += c.resources.generalClassificationKey;
        break;
      case "StratList":
        url += c.resources.startListKey;
        break;
      default:
        url += c.resources.liveStageResultKey;
        break;

    }
    // implement after selectionServiceChanges
    if(this._contestId > 0){
      url += "?Contest=" + this._contestId;
    }
    if(this._stageId > 0){
      url += "&SelectorResult=" + this._stageId;
    }
    if (filters) {
      url += "&filter=[" + filters + ']';
    }
    return url;
  }
}
