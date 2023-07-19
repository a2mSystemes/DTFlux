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

    this.sub = this.mockingService.subscribeRunnersResults().subscribe({
      "next": (data) => {
        this.data = data;
        },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

}
