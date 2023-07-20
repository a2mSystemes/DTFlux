import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.sass'],
})
export class PrivateComponent {
  private _subExporter: any;
  private _subCommands: any;
  private _subTimers: any;
  private _subLiveResult: any;
  protected dataCommands?: any;
  protected dataExporter?: any;
  protected dataLiveResult?: any;
  protected dataTimers?: any;

  constructor(private _websocketService: WebsocketService, protected configService:ConfigService) {

    this._subExporter = this._websocketService.subscribeWsExporter().subscribe({
      next: (data: any) => {
        this.dataExporter = JSON.stringify(data);
      },
    });
    this._subLiveResult = this._websocketService
      .subscribeWsLiveResult()
      .subscribe({
        next: (data: any) => {
          this.dataExporter = {text : JSON.stringify(data)};
        },
      });
    this._subTimers = this._websocketService
      .subscribeWsTimers()
      .subscribe({
        next: (data: any) => (this.dataTimers = JSON.stringify(data)),
      });
    this._subCommands = this._websocketService.subscribeWsCommands().subscribe({
      next: (data: any) => this.dataCommands = JSON.stringify(data)
    });
  }

  sendCommand() {
    console.log("command");
    this._websocketService.sendToWsCommands();
  }

  sendToTimer() {
    console.log("Timer");
    this._websocketService.sendToWsTimers();
  }

  sendToLiveResult() {
    console.log("LiveResult");
    this._websocketService.sendToLiveResult();
  }
  sendToExporter() {
    console.log("Exporter");
    this._websocketService.sendToExporter();
  }


}

