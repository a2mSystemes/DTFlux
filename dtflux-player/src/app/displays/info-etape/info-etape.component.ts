import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-info-etape',
  templateUrl: './info-etape.component.html',
  styleUrls: ['./info-etape.component.sass']
})
export class InfoEtapeComponent implements OnInit{
  data?:any;
  sub: Subscription;
  constructor(private mockingService:MockingService){
    this.data = null;

    this.sub = this.mockingService.data$.subscribe({
      "next": (data) => {
        console.log(data);
        this.data = data;
        data.status = 'finish-solo';
        data.contest = 3;
        data.selectorResult = 2;
        data.decompteH = "23:17";
        data.decompteF = "18:17";
        data.FinishTime = "54:48"
        data.lastName1 = "Chassaing";
        data.firstName1 = "Jonathan";
        data.lastName2 = "Maurin";
        data.firstName2 = "Ange-Marie";
      },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

  getDynamicImageLink(): string {
    return `/assets/Medias/Course/Nomcourse-${this.data.contest}-${this.data.selectorResult}.png`;
  }

}