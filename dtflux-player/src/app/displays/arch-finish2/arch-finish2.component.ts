import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-arch-finish2',
  templateUrl: './arch-finish2.component.html',
  styleUrls: ['./arch-finish2.component.sass']
})
export class ArchFinish2Component {

  data:any;

  constructor(public websocketService: WebsocketService){


  }
}
