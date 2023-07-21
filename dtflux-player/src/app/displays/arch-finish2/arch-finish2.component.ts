import { Component } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-arch-finish2',
  templateUrl: './arch-finish2.component.html',
  styleUrls: ['./arch-finish2.component.sass']
})
export class ArchFinish2Component {

  private _runnerNumber: number = 2;
  protected runner?: RunnerResult;
  protected runnerStatus: 'winner-solo' | 'winner-relai' | 'finish-solo' | 'finish-relai' | 'spotter' = 'spotter';
  protected runnerIsRelais: boolean = false;


  constructor() {

  }


}
