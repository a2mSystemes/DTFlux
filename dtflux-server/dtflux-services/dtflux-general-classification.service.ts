import { Observable, Subject, Subscription, timer } from "rxjs";
import * as config from "../dtflux-conf/conf.json";
import axios from "axios";
import { DTFluxURLBuilderService } from "./dtflux-url-builder.service";
import { RunnerResults } from "../dtflux-model/core.model/RunnerResults";
import { DTFluxSelectionService } from "./dtflux-selection.service";

export interface IHttpPollerConfig {
  startTime?: Date | number;
}

export class DTFluxGeneralClassificationService {

  timer: Observable<number>;
  timerSub?: Subscription;
  private _changesSubject = new Subject<any>();
  private _urlBuilder: DTFluxURLBuilderService;
  private _contestSelectionService: DTFluxSelectionService = new DTFluxSelectionService();
  private _currentContest = 1;

  constructor(urlBuilder: DTFluxURLBuilderService) {
    this._urlBuilder = urlBuilder;
    this.timer = timer(0, config.raceResultAPI.refreshApiTimer);
    this._contestSelectionService.getChanges().subscribe({ next: (contest: number) => this._currentContest = contest });
  }

  start() {
    this.timerSub = this.timer.subscribe(() => {
      console.log(this._urlBuilder.buildURL("GenClasification"));
      axios
        .get(this._urlBuilder.buildURL("GenClasification"))
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
