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
  styleUrls: ['./stream.component.sass']
})

export class StreamComponent implements OnInit{
  _runnersResult$:Array<RunnerResult> = new Array<RunnerResult>();
  subRunnerResult!: Subscription;
  subSelectedRunner!: Subscription;
  tableData: any[] = [];
  props: string[] = ['img', 'time', 'gap'];
  selectedRunner$: number = -1;
  runner?: RunnerResult
  chronos: any[] = [];

  constructor(private _mockingService:MockingService, private _selectedRunnerService: SelectedRunnerService){
    this.subRunnerResult = this._mockingService.subscribeRunnersResults().subscribe({next : (data: Array<RunnerResult>) => {
      this._runnersResult$ = data;
      this.chronos = [
               {Split1img: "img1", Split1time: data[this.selectedRunner$].split1Time, Split1gap: data[this.selectedRunner$].split1Gap},
               {Split2img: "img2", Split2time: data[this.selectedRunner$].split2Time, Split2gap: data[this.selectedRunner$].split2Gap},
               {Split3img: "img3", Split3time: data[this.selectedRunner$].split3Time, Split3gap: data[this.selectedRunner$].split3Gap},
               {Split4img: "img4", Split4time: data[this.selectedRunner$].split4Time, Split4gap: data[this.selectedRunner$].split4Gap},
               {Split5img: "img5", Split5time: data[this.selectedRunner$].split5Time, Split5gap: data[this.selectedRunner$].split5Gap},
               {Finishimg: "img6", Finishtime: data[this.selectedRunner$].finishTime, Finishgap: data[this.selectedRunner$].finishGap},
             ];
      const emptyTimeKeys = this.chronos.reduce((emptyKeys: any, current: any, index: number) => {
      const keyPrefix = index < this.chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
      if (current[keyPrefix + 'time'] === '') {
        emptyKeys.push(keyPrefix);
      }
      return emptyKeys;
      }, []);
      this.tableData = ['img', 'time', 'gap'].map(prop => {
        return this.chronos.reduce((acc: any, current: any, index: any) => {
          const keyPrefix = index < this.chronos.length - 1 ? 'Split' + (index + 1) : 'Finish';
          if (!emptyTimeKeys.includes(keyPrefix)) {
            const key = keyPrefix + prop;
            acc[keyPrefix] = current[key];
          }
          return acc;
        }, {});
      });
    }});
    this.subSelectedRunner = this._selectedRunnerService.subscribeSelectedRunner().subscribe({next : (selectedRunner: number) => {
      this.selectedRunner$ = selectedRunner;
  }});
  }

  ngOnInit(): void {

  }

  getRowValues(row: any): any[] {
    return Object.values(row);
  }

  isEmptyTime(index: number): boolean {
     if (index === this.chronos.length - 1) {
       return this.chronos[index]['Finishtime'] === '';
     } else {
       return this.chronos[index]['Split' + (index + 1) + 'time'] === '';
     }
  }

  isImage(value: string): boolean {
    return value.startsWith('img');
  }

  getDynamicImageLink(): string {
    return `/assets/Medias/Course-stream/Nomcourse-${this._runnersResult$[0].contestId}-${this._runnersResult$[0].stageId}.png`;
  }

}
