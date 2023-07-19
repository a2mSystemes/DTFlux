import { Observable, Subject, Subscription, timer } from "rxjs";
import * as config from "../dtflux-conf/conf.json";
import axios from "axios";
import { DTFluxURLBuilderService } from "./dtflux-url-builder.service";
import { RunnerResults } from "../dtflux-model/core.model/RunnerResults";

export interface IHttpPollerConfig {
  startTime?: Date | number;
}

export class ContestID {
  "XPSRelais": number;
  "XP": number;
  "XPS": number;
}

export class DTFluxLiveResultService {

  timer: Observable<number>;
  timerSub?: Subscription;
  private _changesSubject = new Subject<any>();
  private _urlBuilder: DTFluxURLBuilderService = new DTFluxURLBuilderService();

  constructor(conf?: IHttpPollerConfig) {
    this.timer = timer(0, config.raceResultAPI.refreshApiTimer);
  }

  
  start() {
    this.timerSub = this.timer.subscribe(() => {
      axios
        .get(this._urlBuilder.buildURL())
        .then((response) => {
          this.updateData(response.data);
        })
        .catch((error) => {
          console.log("axios error");
        });
    });
  }

  stop() {
    console.log("Stopping api calls...");
    this.timerSub?.unsubscribe();
  }

  updateData(data: any) {
    const runners = new RunnerResults(data);
    console.log("in LiveResult Service");
    // console.log(runners[0]);
    this._changesSubject.next(data);
  }
  
  getChanges(): Observable<any> {
    return this._changesSubject.asObservable();
  }
  
}
