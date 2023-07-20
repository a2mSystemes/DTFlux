import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { ExporterResult } from 'src/app/dtflux-ui-model/race-result.model/ExporterResult';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-arch-finish1',
  templateUrl: './arch-finish1.component.html',
  styleUrls: ['./arch-finish1.component.sass'],
})
export class ArchFinish1Component implements OnInit {
  finnisherStatus:
    | 'finish-solo'
    | 'finish-solo'
    | 'finish-relai'
    | 'winner-solo'
    | 'winner-relai'
    | '' = '';
  finisher1?: RunnerResult;
  exporterSub: Subscription;
  constructor(private _websocketService: WebsocketService) {
    this.exporterSub = this._websocketService.subscribeWsExporter().subscribe({
      next: (finishers: any) => {
        console.log("finishers received");
        console.log(finishers)
        this.finisher1 = RunnerResult.fromExporter(finishers[1]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
