import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY, of, interval} from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, catchError, distinctUntilChanged, pairwise, tap, delay, first, takeLast, distinct, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {
  socket$: WebSocketSubject<any> = webSocket({
    url: 'http://localhost:3000/dt-api/v1/ws/', //
    openObserver: {
      next: () => {
        this.socket$.next({'data-request' : 'runners' });
      }
    },
  });
  constructor() { }
  ngOnInit(): void {

  }
}
