import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY, of, interval, Observer} from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, catchError, distinctUntilChanged, pairwise, tap, delay, first, takeLast, distinct, switchMap, switchAll } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';

const SERVER_URL = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {
  public dataSubject$: WebSocketSubject<any>;
  public message$:any;

  constructor() {
    this.dataSubject$ = webSocket(SERVER_URL);

  }
  ngOnInit(): void {
    console.log("sending message");

  }

}
