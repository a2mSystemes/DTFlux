import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-arch-spotter1',
  templateUrl: './arch-spotter1.component.html',
  styleUrls: ['./arch-spotter1.component.sass']
})
export class ArchSpotter1Component implements OnInit{
  data?:any;
  sub: Subscription;
  constructor(private mockingService:MockingService){
    this.data = null;

    this.sub = this.mockingService.data$.subscribe({
      "next": (data) => {
        console.log(data);
        this.data = data;
        data.status = 'finish-relai';
      },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

}