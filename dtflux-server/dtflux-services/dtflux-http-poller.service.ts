import { Observable, Subject, Subscription, timer } from "rxjs";
import * as config from "../dtflux-conf/conf.json";
import axios from "axios";
import { IParticipant } from "../dtflux-model/dtflux-schema.model";
import { ILiveResult } from "../dtflux-model/race-result.model/ILiveResult";
import { LiveResultResultset } from "../dtflux-model/race-result.model/LiveResultResultset";

export interface IHttpPollerConfig {
  startTime?: Date | number;
}

export class ContestID {
  "XPSRelais": number;
  "XP": number;
  "XPS": number;
}

export class HttpPollerService {
  timer: Observable<number>;
  timerSub?: Subscription;
  data$: Subject<any> = new Subject<any>();
  contest: string = "XP";

  constructor(conf?: IHttpPollerConfig) {
    this.timer = timer(0, config.raceResultAPI.refreshApiTimer);
  }

  private buildURL(
    what?: "StratList" | "LiveResult" | "GenClasification",
    filters?: any,
  ): string {
    what = what ? what : "LiveResult";
    let conf = config.raceResultAPI as any; // no typing here
    let url = conf.useLocal ? conf.baseLocalUrl + "/_" : conf.baseDistantUrl;
    url += conf.idEvent;
    url += conf.useLocal ? "/api/" : "";
    url += conf.resources.liveStageResultKey + "?Contest=";
    url += conf.contests[this.contest];
    if (filters) {
      // console.log("filters: " + filters);
    } else {
      // console.log("filters is null");
    }
    // console.log("url: " + url);
    return url;
  }

  start() {
    this.timerSub = this.timer.subscribe(() => {
      axios
        .get(this.buildURL())
        .then((response) => {
          this.updateData(response.data as LiveResultResultset);
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

  updateData(data: LiveResultResultset) {
    const participants = new Array<IParticipant>();
    for (const r of data) {
    }
    this.data$.next(data);
  }
}
