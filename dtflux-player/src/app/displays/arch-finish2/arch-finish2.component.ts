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
    this.websocketService.dataSubject$.subscribe({
      next: data => {
        console.log('message received: ' + data);
        let d = data[0];
        d.photo1 = "/assets/photos-coureurs/" + d.Bib + ".png";
        this.data = d;
        console.log(`sending to page ${Object.keys(d)}`);
        console.log(`sending to page \n ${Object.values(d)}`);

      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
     });

  }
}
