import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY, of, interval, Observer, Subscription} from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, catchError, distinctUntilChanged, pairwise, tap, delay, first, takeLast, distinct, switchMap, switchAll } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';

const SERVER_URL = 'ws://localhost:5001/dtflux-api/v1/ws';

export interface IDTFluxWebSocketMessage<T>{
  send():boolean;
} 

export abstract class DTFLuxWebSocketMessage<T> implements IDTFluxWebSocketMessage<T>{
  private _data: T;
  constructor(data:T, wsSub: WebSocketSubject<any>){
    this._data = data;
  }
  abstract send():boolean;
}

export class DTFluxCommandMessage<Object>{

}
// TODO: we need to define a base class for all.
export class MilluminMessage{
  command: string;
  params:string;
  constructor(cmd:string, params:string){
    this.command = cmd;
    this.params = params;
  }
}
export class StartTimerMessage{
  name: string;
  action: "start" | "stop" | "pause" | "reset";
  constructor(name:string, action:"start" | "stop" | "pause" | "reset"){
    this.name = name;
    this.action = action;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {
  private _exporterChannel: WebSocketSubject<any>;
  private _liveResultSubject: WebSocketSubject<any>;
  private _timersSubject: WebSocketSubject<any>;
  private _commandsSubject: WebSocketSubject<any>;

  constructor() {
    this._exporterChannel = webSocket(SERVER_URL + "?channel=exporter" );
    this._liveResultSubject = webSocket<any>(SERVER_URL + "?channel=live-result" );
    this._timersSubject = webSocket<any>(SERVER_URL + "?channel=timers" );
    this._commandsSubject = webSocket<any>(SERVER_URL + "?channel=command" );
  }
  ngOnInit(): void {

  }

  subscribeWsExporter(){
    return this._exporterChannel.asObservable()
  }
  subscribeWsLiveResult(){
    return this._exporterChannel.asObservable()
  }
  subscribeWsTimers(){
    return this._exporterChannel.asObservable()
  }
  subscribeWsCommands(){
    return this._exporterChannel.asObservable()
  }

  sendToExporter(data: any){
    this._exporterChannel.next(data);
  }
  sendToLiveResult(data: any){
    this._liveResultSubject.next(data);
  }
  sendToWsTimers(data: any){
    this._timersSubject.next(data)
  }
  sendToWsCommand(data: any){
    this._commandsSubject.next(data)
  }

}
