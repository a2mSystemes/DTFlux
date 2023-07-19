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
  private _liveResultChannel: WebSocketSubject<any>;
  private _timersChannel: WebSocketSubject<any>;
  private _commandsChannel: WebSocketSubject<any>;
  private _dbChannel: WebSocketSubject<any>;

  constructor() {
    this._commandsChannel = webSocket<any>(SERVER_URL + "?channel=command" );
    this._exporterChannel = webSocket(SERVER_URL + "?channel=exporter" );
    this._liveResultChannel = webSocket<any>(SERVER_URL + "?channel=live-result" );
    this._timersChannel = webSocket<any>(SERVER_URL + "?channel=timers" );
    this._dbChannel = webSocket<any>(SERVER_URL + "?channel=db" );
  }
  ngOnInit(): void {

  }

  subscribeWsExporter(){
    return this._exporterChannel.asObservable()
  }
  subscribeWsLiveResult(){
    return this._liveResultChannel.asObservable()
  }
  subscribeWsTimers(){
    return this._timersChannel.asObservable()
  }
  subscribeWsCommands(){
    return this._commandsChannel.asObservable()
  }

  sendToExporter(){
    const data = {response: "OK from exporterClient"}
    console.log(data);
    this._exporterChannel.next(data);
  }
  sendToLiveResult(){
    const data = {response: "OK from liveResultClient"}
    console.log(data);
    this._liveResultChannel.next(data);
  }
  sendToWsTimers(){
    const data = {response: "OK from TimerClient"}
    console.log(data);
    this._timersChannel.next(data)
  }
  sendToWsCommand(){
    const data = {response: "OK from commandClient"}
    console.log(data);
    this._commandsChannel.next(data)
  }

}
