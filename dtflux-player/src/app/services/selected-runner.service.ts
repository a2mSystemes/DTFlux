import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { WebsocketService } from './network/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedRunnerService {
  _selectedSubject: Subject<number> = new Subject<number>();
  _wsSubscription: Subscription;



  constructor(private _websocketService: WebsocketService) {
    this._wsSubscription = this._websocketService.subscribeWsCommands().subscribe( (data) => {
    console.log(data);

      if(data && data.command === 'select.runner' && data.value !== undefined) {
        console.log(`pushes value ${data.value}`)
        this._selectedSubject.next(data.value);
      }
    });
   }
   getSubject(){
    console.log("getSubject");
    return this._selectedSubject;
   }
   setSelected(selected: number){
    const message = {
      channel: "commands",
      target: "selected-runner",
      value: selected,
      command: "select.runner"
    }
    return this._websocketService.sendToWsCommands(message);
   }

  subscribeSelectedRunner() {
    return this._selectedSubject.asObservable();
  }
}
