import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY, of, interval, Observer, Subscription} from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, catchError, distinctUntilChanged, pairwise, tap, delay, first, takeLast, distinct, switchMap, switchAll } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ConfigService } from '../config.service';



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
  private _websocketBaseUrl = "";


  constructor(private _configService: ConfigService) {
    this._websocketBaseUrl = this._configService.getConf("websocketBaseUrl")
    this._commandsChannel = webSocket<any>(this._websocketBaseUrl + "?channel=command" );
    this._exporterChannel = webSocket(this._websocketBaseUrl + "?channel=exporter" );
    this._liveResultChannel = webSocket<any>(this._websocketBaseUrl + "?channel=live-result" );
    this._timersChannel = webSocket<any>(this._websocketBaseUrl + "?channel=timers" );
    this._dbChannel = webSocket<any>(this._websocketBaseUrl + "?channel=db" );
    // this.subscribeWsLiveResult().subscribe({next : (data) => { console.log(data)}})

  }
  ngOnInit(): void {
  }

  subscribeWsExporter(){
    return this._exporterChannel.asObservable();
  }
  subscribeWsLiveResult(){
    return this._liveResultChannel.asObservable();
  }
  subscribeWsTimers(){
    return this._timersChannel.asObservable();
  }
  subscribeWsCommands(){
    return this._commandsChannel.asObservable();
  }

  sendToExporter(data?: any){
    const mesg = {channel: "exporter", ...data  }
    console.log(data);
    this._exporterChannel.next(data);
  }
  sendToLiveResult(data?: any){
    this._liveResultChannel.next(data);
  }
  sendToWsTimers(data?: any){
    this._timersChannel.next(data);
  }
  sendToWsCommands(data?: any){
    this._commandsChannel.next(data);
  }

}
