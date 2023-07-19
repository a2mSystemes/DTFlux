import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, Subscription } from 'rxjs';
import { RunnerResults } from '../dtflux-ui-model/core.model/RunnerResults';
import { StageFinishers } from '../dtflux-ui-model/core.model/StageFinishers';


@Injectable({
  providedIn: 'root'
})

export class SpotterService {

  private _exporterSubscription: Subscription;
  private _exporterData?: RunnerResults;


  constructor(private _websocketService: WebsocketService) {
    this._exporterSubscription = this._websocketService.subscribeWsExporter().subscribe({
      next: (data: StageFinishers) => {
        const finishers = data.finishers;
        this._exporterData = finishers;
      }
    });
  }

  sendCommand(command: string, data?: any):void{
    const message = {channel: "exporter", command: command, data: data};
    this._websocketService.sendToExporter();
  }
}
