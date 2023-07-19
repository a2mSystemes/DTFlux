import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.sass']
})
export class PrivateComponent {
  private _subExporter: any;
  private _subCommands: any;
  private _subTimers: any;
  private _subLiveResult: any;


  constructor(private _websocketService: WebsocketService) {
    this._subExporter = this._websocketService.subscribeWsExporter();
    this._subLiveResult = this._websocketService.subscribeWsLiveResult();
    this._subTimers = this._websocketService.subscribeWsTimers();
    this._subCommands = this._websocketService.subscribeWsCommands();
  }

  sendCommand(){
    this._websocketService.sendToWsCommand({test: "test command"});
  }

  sendTimer(){
    this._websocketService.sendToWsTimers({test: "test timer"});
  }

  sendToLiveResult(){
    this._websocketService.sendToLiveResult({test: "LiveResult refresh"});
  }
  sendToExporter(){
    this._websocketService.sendToLiveResult({test: "Exporter refresh"});
  }
}
