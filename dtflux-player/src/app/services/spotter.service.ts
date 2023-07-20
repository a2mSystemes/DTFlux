import { Injectable } from '@angular/core';
import { WebsocketService } from './network/websocket.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { RunnerResultsUI } from '../dtflux-ui-model/core.model/RunnerResults';
import { StageFinishers } from '../dtflux-ui-model/core.model/StageFinishers';


@Injectable({
  providedIn: 'root'
})

export class SpotterService {

  private _exporterSubscription: Subscription;
  private _exporterData?: RunnerResultsUI;
  private _spotterSubject: Subject<RunnerResultsUI> = new Subject<RunnerResultsUI>;


  constructor(private _websocketService: WebsocketService) {
    this._exporterSubscription = this._websocketService.subscribeWsExporter().subscribe({
      next: (data: StageFinishers) => {
        const spotters = data.spotters;
        this._exporterData = spotters;
        this._spotterSubject.next(this._exporterData);
      }
    });
  }

  sendCommand(command: string, data?: any):void{
    const message = {channel: "exporter", command: command, data: data};
    this._websocketService.sendToExporter();
  }
  subscribeSpotters(): Observable<RunnerResultsUI>{
    return this._spotterSubject.asObservable();
  }
}
