import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class Mock{
  lastname1:string;
  lastnameR1:string;
  firstname1:string;
  firstnameR1:string;
  bib1:number;
  rank1: number;
  actualtime1: string;
  finishtime1: string;
  photo1: string;
  lastname2: string;
  firstname2: string;
  lastnameR2: string;
  firstnameR2: string;
  bib2: number;
  rank2: number;
  actualtime2: string;
  finishtime2: string;
  photo2: string;
  lastname3: string;
  firstname3: string;
  lastnameR3: string;
  firstnameR3: string;
  bib3: number;
  rank3: number;
  actualtime3: string;
  finishtime3: string;
  lastname4: string;
  firstname4: string;
  lastnameR4: string;
  firstnameR4: string;
  bib4: number;
  rank4: number;
  actualtime4: string;
  finishtime4: string;
  photo4: string;



  constructor(){



    this.lastname1 = "Raphael";
    this.firstname1 = "Seraphina";
    this.lastnameR1 = "Palienkov";
    this.firstnameR1 = "Dimitri";
    this.bib1 = 109;
    this.rank1 = 29;
    this.actualtime1 = "21:04"
    this.finishtime1 = "13:29";
    this.photo1 = "/assets/Photos coureurs/109.png";

    this.lastname2 = "Jonas";
    this.firstname2 = "Michelle";
    this.lastnameR2 = "Palienkov";
    this.firstnameR2 = "Dimitri";
    this.bib2 = 24;
    this.rank2 = 4;
    this.actualtime2 = "21:04"
    this.finishtime2 = "13:07";
    this.photo2 = "/assets/Photos coureurs/109.png";

    this.lastname3 = "Bachibouzouk";
    this.firstname3 = "Henri";
    this.lastnameR3 = "Farmer";
    this.firstnameR3 = "Mylène";
    this.bib3 = 287;
    this.rank3 = 101;
    this.actualtime3 = "32:49"
    this.finishtime3 = "41:55";
    this.photo2 = "/assets/Photos coureurs/109.png";

    this.lastname4 = "Dusseldorf";
    this.firstname4 = "Ronan";
    this.lastnameR4 = "Dupond";
    this.firstnameR4 = "Jean";
    this.bib4 = 3;
    this.rank4 = 2;
    this.actualtime4 = "15:26"
    this.finishtime4 = "19:38";
    this.photo4 = "Photos coureurs/109.png";
  }
}

export class MockingService {


  public static test:number = 0;
  data$: Observable<any>;
  sub: Subscription;
  mock: Mock;
  subject: Subject<any>;

  constructor() {
    MockingService.test += 1;
    this.mock = new Mock();
    this.data$ = new Observable<any>(
      observer => {
        observer.next(this.mock);
      }
    );

    this.subject = new Subject<any>();
    this.sub = this.subject.subscribe({
      "next" : (data) => {
        this.mock = data;
        console.log(data);
      }
    });

   }

   setData(data: Mock) {
    this.data$
  }
}
