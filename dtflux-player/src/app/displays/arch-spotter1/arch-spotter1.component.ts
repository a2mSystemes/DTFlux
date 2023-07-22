import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { StageFinishers } from 'src/app/dtflux-ui-model/core.model/StageFinishers';
import { StageFinishersService } from 'src/app/services/stage-finishers.service';

@Component({
  selector: 'app-arch-spotter1',
  templateUrl: './arch-spotter1.component.html',
  styleUrls: ['./arch-spotter1.component.sass']
})
export class ArchSpotter1Component implements OnInit {
  spotterStatus:
    | 'finish-solo'
    | 'finish-solo'
    | 'finish-relai'
    | 'winner-solo'
    | 'winner-relai'
    | '' = 'finish-solo';
    display:boolean = false;

  finnishers?: StageFinishers;
  spotter?: RunnerResult = new RunnerResult();
  stageFinishersSub: Subscription;
  counter?: number;

  displayTimeout?: number;
  timerSubscription: any;


  constructor(private _stagefinishersService: StageFinishersService) {
    this.stageFinishersSub = this._stagefinishersService.getSpotterSubscriber().subscribe({
      next: (data: RunnerResult) => {
        console.log("spotter received : ");
        this.display_deleg();
        this.spotter = data;
        console.log(this.spotter);
        this.spotter.photo = '/assets/photos-coureurs/' + this.spotter.bib + ".png";
        // this.spotter.photo = '/assets/photos-coureurs/' + String(2) + ".png";
        if(this.spotter?.contestId === 1) {
          if(this.spotter.stageId === 5 && this.spotter.currentSplitRank === 1) this.spotterStatus = 'winner-relai';
          else this.spotterStatus = 'finish-relai';
        }
        else {
          if(this.spotter?.stageId === 5 && this.spotter?.currentSplitRank === 1) this.spotterStatus = 'winner-solo';
          else this.spotterStatus = 'finish-solo';
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  display_deleg():void{
    console.log("finnisher display ON");
    this.display = true;
    if(this.displayTimeout){
      clearTimeout(this.displayTimeout);
    }
    this.displayTimeout  = ((setTimeout(() => {
      this.display = false;
    console.log("finnisher display OFF");
    }, 10 * 1000) as unknown ) as number);
    console.log(this.displayTimeout);
  }

  startTimer(): void {
    // Unsubscribe from previous timer if exists
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    // Create a new timer that emits a value every second
    const timer$ = timer(0, 30000);

    // Subscribe to the timer and update the counter
    this.timerSubscription = timer$.subscribe((value) => {
      this.counter = value;
    });
  }
  ngOnInit(): void {}
}
