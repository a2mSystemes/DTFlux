import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-arch-finish1',
  templateUrl: './arch-finish1.component.html',
  styleUrls: ['./arch-finish1.component.sass']
})


export class ArchFinish1Component implements OnInit{
  data?:any;
  sub: Subscription;
  constructor(private mockingService:MockingService){
    this.data = null;

    this.sub = this.mockingService.subscribeRunnersResults().subscribe({
      next: (data:any) => {
        console.log(data);
        this.data = data;
        data.status = 'winner-solo';
      },
      "error": (err) => {console.log(err);},
    });

  }

  ngOnInit(): void {

  }

}
