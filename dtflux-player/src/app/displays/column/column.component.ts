import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.sass']
})
export class ColumnComponent implements OnInit{
  data?:any;
  //sub: Subscription;
  constructor(private mockingService:MockingService){
    this.data = null;

/*     this.sub = this.mockingService.data$.subscribe({
      "next": (data) => {
        console.log(data);
        this.data = data;
        data.tableaucoureurs =
        [
          {Rank: 1, Bib : 888,LastName : "Rosental",FirstName : "Sacha", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : ""},
          {Rank: 2, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 3, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 4, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 5, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 6, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 7, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 8, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 9, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 10, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 11, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 12, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
          {Rank: 13, Bib : 109,LastName : "Serrapica",FirstName : "Raphael", Swim : "12:13",Transition : "01:02",Run : "34:56",FinishTime : "54:40",Gap : "+00:17"},
        ]
      },
      "error": (err) => {console.log(err);},
    }); */

  }

  ngOnInit(): void {

  }

}
