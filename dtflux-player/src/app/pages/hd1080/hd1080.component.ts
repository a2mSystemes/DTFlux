import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-hd1080',
  templateUrl: './hd1080.component.html',
  styleUrls: ['./hd1080.component.sass']
})
export class Hd1080Component implements OnInit {

  constructor(private wss: WebsocketService){

  }

  ngOnInit(): void {
  }

}
