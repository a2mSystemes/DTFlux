import { Component, OnInit } from '@angular/core';
import { truncateSync } from 'fs';
import { run } from 'node:test';
import { stringify } from 'querystring';
import { Observable, Subscription } from 'rxjs';
import { ILiveResult } from 'src/app/dtflux-ui-model/ILiveResult';
import { RunnerResult } from 'src/app/dtflux-ui-model/IRunner';
import { MockingService } from 'src/app/services/mocking.service';
import { SelectedRunnerService } from 'src/app/services/selected-runner.service';



@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.sass'],
  animations: []

})

let chronos: any[] = [];
const afficheencours = 2;

export class StreamComponent implements OnInit{
  data$:Array<ILiveResult> = new Array<ILiveResult>();
  subLiveResult!: Subscription;
  subSelectedRunner!: Subscription;
  tableData: any[] = [];
  props: string[] = ['img', 'time', 'gap'];
  selectedRunner$: number = -1;

  constructor(private _mockingService:MockingService, private _selectedRunnerService: SelectedRunnerService){
    this.subLiveResult = this._mockingService.subscribeLiveResultDatas().subscribe({next : (data: Array<ILiveResult>) => {
      this.data$ = data;
    }});
    this.subSelectedRunner = this._selectedRunnerService.subscribeSelectedRunner().subscribe({next : (selectedRunner: number) => {
      this.selectedRunner$ = selectedRunner;
  }});
    // this.data = null;

    // this.sub = this.mockingService.data$.subscribe({
    //   "next": (data: Array<RunnerResult>) => {

    //     //data.status = 'finish-solo';
    //     chronos = [
    //       {Split1img: "img1", Split1time: data[afficheencours].split1Time, Split1gap: data[afficheencours].split1Gap},
    //       {Split2img: "img2", Split2time: data[afficheencours].split2Time, Split2gap: data[afficheencours].split2Gap},
    //       {Split3img: "img3", Split3time: data[afficheencours].split3Time, Split3gap: data[afficheencours].split3Gap},
    //       {Split4img: "img4", Split4time: data[afficheencours].split4Time, Split4gap: data[afficheencours].split4Gap},
    //       {Split5img: "img5", Split5time: data[afficheencours].split5Time, Split5gap: data[afficheencours].split5Gap},
    //       {Finishimg: "img6", Finishtime: data[afficheencours].finishTime, Finishgap: data[afficheencours].finishGap},
    //     ];

    //     const emptyTimeKeys = chronos.reduce((emptyKeys: any, current: any, index: number) => {
    //       const keyPrefix = index < chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
    //       if (current[keyPrefix + 'time'] === '') {
    //         emptyKeys.push(keyPrefix);
    //       }
    //       return emptyKeys;
    //     }, []);

    //     this.tableData = ['img', 'time', 'gap'].map(prop => {
    //       return chronos.reduce((acc: any, current: any, index: any) => {
    //         const keyPrefix = index < chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
    //         if (!emptyTimeKeys.includes(keyPrefix)) {
    //           const key = keyPrefix + prop;
    //           acc[keyPrefix] = current[key];
    //         }
    //         return acc;
    //       }, {});
    //     });


    //   },
    //   "error": (err) => {console.log(err);},
    // });

  }

  ngOnInit(): void {

  }

  getRowValues(row: any): any[] {
    return Object.values(row);
  }

  isEmptyTime(index: number): boolean {
    // if (index === this.chronos.length - 1) {
    //   return this.chronos[index]['Finishtime'] === '';
    // } else {
    //   return this.chronos[index]['Split' + (index + 1) + 'time'] === '';
    // }
    return false;
  }

  isImage(value: string): boolean {
    return value.startsWith('img');
  }

  getDynamicImageLink(): string {
    return `/assets/Medias/Course-stream/Nomcourse-${this.data$[0].ContestID}-${this.data$[0].stageId}.png`;
  }

}
