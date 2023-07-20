import { Injectable } from '@angular/core';
import { WebsocketService } from '../network/websocket.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionServiceService {
  private _contestChangeSubject: Subject<number> = new Subject<number>();
  private _stageChangeSubject: Subject<number> = new Subject<number>();
  private _currentContestId: number = 1;
  private _currentStageId: number = 1;


  constructor(private _websocketService: WebsocketService) {

  }

  subscribeContestChange(): Observable<number> {
    return this._contestChangeSubject.asObservable();
  }

  subscribeStageChange(): Observable<number> {
    return this._stageChangeSubject.asObservable();
  }

  setCurrentStageId(stageId: number) {
    this._currentStageId = stageId;
    this._stageChangeSubject.next(this._currentStageId);
    this._websocketService.sendToWsCommands({ command: "update", target: "stage", data: this._currentStageId })

  }
  setCurrentContestId(contestId: number) {
    this._currentContestId = contestId;
    this._contestChangeSubject.next(this._currentContestId);
    this._websocketService.sendToWsCommands({ command: "update", target: "contest", data: this._currentStageId })

  }


}
