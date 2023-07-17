import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, Subscription } from 'rxjs';
import {IRaceResultData} from '../../../../dtflux-server/dtflux-model/schema'


export interface ISpotter{
  bib: number,
  firstName: string,
  lastName: string,
  photo:string,
  club: string,
  status: "solo" | "relai", // solo or relai
  gender: "H"| "F" | "";
  rank: number,
  time: number,
  teamName: string,
  firstName2?: string;
  lastName2?: string;
  bib2?: number;
  photo2?: string;
}

export class Spotter implements ISpotter{
  bib: number = 0;
  firstName: string = "";
  lastName: string = "";
  status: "solo" | "relai" = "solo";
  photo: string = "/assets/photos-coureurs/";
  club: string = " ";
  gender: 'H' | 'F' | "" = "";
  rank: number = 0;
  time: number = 0;
  teamName: string = "";
  firstName2?: string;
  lastName2?: string;
  bib2?: number;
  photo2?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SpotterService {

  wsSub: Subscription;
  data$: Subject<Array<ISpotter>> = new Subject<Array<ISpotter>>();

  constructor(private results:WebsocketService) {
    this.wsSub = this.results.dataSubject$.subscribe({
      next: (data:Array<IRaceResultData>) => {
        console.log('message received: ' + data);
        const spotters = new Array<ISpotter>();
        for(let d of data) {
          const spotter = new Spotter();
          spotter.bib = d.Bib;
          spotter.lastName = d.Lastname;
          spotter.firstName = d.Firstname;
          spotter.gender = d.Gender === "M"? "H" : "F";
          spotter.club = d.Club;
          spotter.rank = d.CurrentSplitRank;
          if (d.ContestID === 1){ // this is a relai
            spotter.status = "relai";
            spotter.teamName = d.TeamName;
            spotter.firstName2 = d.Firstname2;
            spotter.lastName2 = d.Lastname2;
            spotter.bib2 = d.Bib;
            spotter.photo = d.Bib + ".1.png";
            spotter.photo2 += d.Bib + ".2.png";
          }else{
            spotter.photo += d.Bib + ".png";
          }
        }
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
     });

  }
}
