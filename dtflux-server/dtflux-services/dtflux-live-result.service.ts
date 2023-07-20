import { Observable, Subject, Subscription, timer } from "rxjs";
import * as config from "../dtflux-conf/conf.json";
import axios from "axios";
import { DTFluxURLBuilderService } from "./dtflux-url-builder.service";
import { RunnerResults } from "../dtflux-model/core.model/RunnerResults";

export interface IHttpPollerConfig {
  startTime?: Date | number;
}


export class DTFluxLiveResultService {

  timer: Observable<number>;
  timerSub?: Subscription;
  private _changesSubject = new Subject<any>();
  private _urlBuilder: DTFluxURLBuilderService;

  constructor(urlBuilder: DTFluxURLBuilderService) {
    this._urlBuilder = urlBuilder;
    this.timer = timer(0, config.raceResultAPI.refreshApiTimer);
    this.start();
  }
  
  start() {
    this.timerSub = this.timer.subscribe(() => {
      // console.log(this._urlBuilder.buildURL());

      axios
        .get(this._urlBuilder.buildURL())
        .then((response) => {
          this.updateData(response.data);
        })
        .catch((error) => {
          console.log("axios error" + error);
        });
    });
  }

  stop() {
    console.log("Stopping api calls...");
    this.timerSub?.unsubscribe();
  }

  updateData(data: any) {

    this._changesSubject.next(new RunnerResults(data));
  }
  
  getChanges(): Observable<any> {
    return this._changesSubject.asObservable();
  }
  
}
