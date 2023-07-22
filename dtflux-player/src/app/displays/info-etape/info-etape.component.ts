import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { SelectionService } from 'src/app/services/backend/selection.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';
@Component({
  selector: 'app-info-etape',
  templateUrl: './info-etape.component.html',
  styleUrls: ['./info-etape.component.sass']
})
export class InfoEtapeComponent implements OnInit {
  contestId: number = 1;
  stageId: number = 1;
  subContest: Subscription;
  subStage: Subscription;
  dataStatus: 'winner-solo' | 'winner-relai' | '' = '';
  contestIdencours : number = 1;
  stageIdencours : number = 1;
  imageLink: string = "";

  constructor(private selectionService: SelectionService) {


    this.subContest = this.selectionService.subscribeContestChange().subscribe({
      next: (data: number) => {
        this.contestId = data;
      this.imageLink = `/assets/Medias/Course/Nomcourse-${this.contestId}-${this.stageId}.png`
        console.log(data);
      },
      "error": (err) => { console.log(err); },
    });
    this.subStage = this.selectionService.subscribeStageChange().subscribe({
      next: (data: number) => {
        console.log(data);
        this.stageId = data;
        this.imageLink = `/assets/Medias/Course/Nomcourse-${this.contestId}-${this.stageId}.png`
      },
      "error": (err) => { console.log(err); },
    });

    }

  ngOnInit(): void {

  }

  // convertToMilliseconds(timeString: string) {
  //   const [hours, minutes, seconds] = timeString.split(':').map(Number);
  //   const milliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
  //   return milliseconds;
  // }

  getDynamicImageLink(): string {
    return `/assets/Medias/Course/Nomcourse-${this.contestId}-${this.stageId}.png`;
  }

}
