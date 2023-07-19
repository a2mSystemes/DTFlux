import { Component } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { SpotterService } from 'src/app/services/spotter.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-arch-finish2',
  templateUrl: './arch-finish2.component.html',
  styleUrls: ['./arch-finish2.component.sass']
})
export class ArchFinish2Component {

  protected _runnerSubscription: Subscription;
  private _runnerNumber: number = 2;
  protected runner?: RunnerResult;
  protected runnerStatus: 'winner-solo' | 'winner-relai' | 'finish-solo' | 'finish-relai' | 'spotter' = 'spotter';
  protected runnerIsRelais: boolean = false;


  constructor(private _spotterService: SpotterService) {
    this._runnerSubscription = this._spotterService.subscribeSpotters().subscribe({
      next: (data: RunnerResults) => {
        console.log("data: " + data);

        const runner = (this._runnerNumber - 1) >= 0 ? this._runnerNumber - 1 : this._runnerNumber;
        // if (data[runner]) {
        //   this.runner = data[runner];
        // }
      }
    });
  }


}
