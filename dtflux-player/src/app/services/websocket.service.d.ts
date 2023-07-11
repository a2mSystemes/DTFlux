import { OnInit } from '@angular/core';
import { WebSocketSubject } from "rxjs/webSocket";
export declare class WebsocketService implements OnInit {
    socket$: WebSocketSubject<any>;
    constructor();
    ngOnInit(): void;
}
