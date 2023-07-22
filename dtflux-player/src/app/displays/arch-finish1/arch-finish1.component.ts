import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { StageFinishers } from 'src/app/dtflux-ui-model/core.model/StageFinishers';
import { ExporterResult } from 'src/app/dtflux-ui-model/race-result.model/ExporterResult';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';
import { StageFinishersService } from 'src/app/services/stage-finishers.service';


@Component({
  selector: 'app-arch-finish1',
  templateUrl: './arch-finish1.component.html',
  styleUrls: ['./arch-finish1.component.sass'],
})
export class ArchFinish1Component implements OnInit {
  finnisherStatus:
    | 'finish-solo'
    | 'finish-solo'
    | 'finish-relai'
    | 'winner-solo'
    | 'winner-relai'
    | '' = 'finish-solo';
    display:boolean = false;

  finisher?: RunnerResult;
  stageFinishersSub: Subscription;
  displayTimeout?: number;
  rankAdjust:string = "eme"

  constructor(private _stagefinishersService: StageFinishersService) {
    this.stageFinishersSub = this._stagefinishersService.getfinnisherSubscriber().subscribe({
      next: (data: RunnerResult) => {

        if(data.currentSplitRank === 1 ){
          if(data.gender === 'F'){
            this.rankAdjust = "ere";
          }else{
            this.rankAdjust = "er";
          }
        }else{
          this.rankAdjust = "eme";
        }
        this.display_deleg();
        console.log("finishers received : ");
        console.log(data)
        // console.log(finishers)
        //this.finisher = data.finishers.shift();
        this.finisher = data;
        this.finisher.photo = '/assets/photos-coureurs/' + this.finisher.bib + ".png";
        console.log(this.finisher);


        if(this.finisher?.contestId === 1) {
          if(this.finisher.stageId === 5 && this.finisher.currentSplitRank === 1) this.finnisherStatus = 'winner-relai';
          else this.finnisherStatus = 'finish-relai';
        }
        else {
          if(this.finisher?.stageId === 5 && this.finisher?.currentSplitRank === 1) this.finnisherStatus = 'winner-solo';
          else this.finnisherStatus = 'finish-solo';
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
    }, 4 * 1000) as unknown ) as number);
    console.log(this.displayTimeout);
  }

  ngOnInit(): void {}
}
