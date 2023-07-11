import { Observable, ObservableInput, Subject, Subscription, interval, takeUntil, timer } from "rxjs";
import App from "../app";
import axios from "axios";
import {WebSocket, Server} from 'ws';

export class DTFluxModel{


    config: any;
    timer: Observable<number>;
    timerSubs: Subscription;
    data: any;
    io?: Server; 
    socketOk: boolean = false;
    sub: Subject<any>;

    

    constructor(opts:any){
        this.config = opts;
        this.timer = timer(0, this.config.raceResultAPI.refreshApiTimer);
        this.timerSubs = this.timer.subscribe(() => {
                axios.get(this.buildURL("XP"))
                .then((response) => {
                    this.updateData(response.data);
                    this.data = response.data;
                    // console.log('data received');
                })
                .catch((error) => {
                    console.log("axios error");
                });
        });
        this.sub = new Subject();
    }

    updateData(data: any) {
        this.data = data;
        this.sub.next(this.data);
    }

    setSocket(io: Server) {
        this.io = io;
        this.io.on("connection", (sock: any) => {
            console.log('socket connected');
        });
        console.log('socket set');
    }

    run(): void{

    }

    stop(): void{
        console.log("Stopping api calls...");
        this.timerSubs.unsubscribe();
    }

    private buildURL(contest:string,filters?: any): string{
        let conf = this.config.raceResultAPI;
        let url = conf.useLocal ? conf.baseLocalUrl + '/_' : conf.baseDistantUrl;
        url += conf.idEvent;
        url += conf.useLocal ? "/api/" : "";
        url += conf.resources.liveStageResultKey + "?Contest="
        url += conf.contests[contest];
        if(filters){
            // console.log("filters: " + filters);
        }else{
            // console.log("filters is null");
        }
        // console.log("url: " + url);
        return url;
    }
}