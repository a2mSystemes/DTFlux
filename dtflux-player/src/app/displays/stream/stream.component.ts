import { Component, OnInit } from '@angular/core';
import { truncateSync } from 'fs';
import { run } from 'node:test';
import { stringify } from 'querystring';
import { Observable, Subscription } from 'rxjs';
import { ILiveResult } from 'src/app/dtflux-ui-model/ILiveResult';
import { Runner, RunnerResult, RunnerResults } from 'src/app/dtflux-ui-model/IRunner';
import { MockingService } from 'src/app/services/mocking.service';
import { SelectedRunnerService } from 'src/app/services/selected-runner.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.sass']
})

export class StreamComponent implements OnInit{
  _runnersResult$:RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  subSelectedRunner!: Subscription;
  tableData: any[] = [];
  props: string[] = ['img', 'time', 'gap'];
  selectedRunner$: number = -1;
  runner?: RunnerResult
  timings: any[] = [];
  runnerActuel: RunnerResult = new RunnerResult();

  constructor(private _mockingService:MockingService, private _selectedRunnerService: SelectedRunnerService){
    // console.log('construct');
    this.subSelectedRunner = this._selectedRunnerService .subscribeSelectedRunner().subscribe({next : (selected:number) => {
      this.selectedRunner$ = selected;
      console.log(selected);
      const RunnerActuel = this._runnersResult$.getRunnerResultBib(this.selectedRunner$);
      if(RunnerActuel) this.runnerActuel = RunnerActuel;
      this.AfficheCoureur(this.runnerActuel);
    }})
    console.log(this.selectedRunner$);
    this.subRunnerResult = this._mockingService.subscribeRunnersResults().subscribe({next : (runners: Array<RunnerResult>) => {
      console.log(runners);
      this._runnersResult$.runners = runners;
    }});

  }

  ngOnInit(): void {

  }

  getRowValues(row: any): any[] {
    return Object.values(row);
  }

  isEmptyTime(index: number): boolean {
     if (index === this.timings.length - 1) {
       return this.timings[index]['Finishtime'] === '';
     } else {
       return this.timings[index]['Split' + (index + 1) + 'time'] === '';
     }
  }

  isImage(value: string): boolean {
    return value.startsWith('img');
  }

  getDynamicImageLink(): string {
    //console.log( `/assets/Medias/Course-stream/Nomcourse-${this._runnersResult$[0].contestId}-${this._runnersResult$[0].stageId}.png`);
    //return `/assets/Medias/Course-stream/Nomcourse-${this._runnersResult$[0].contestId}-${this._runnersResult$[0].stageId}.png`;
    return "/assets/Medias/Course-stream/Nomcourse-"+1+"-"+4+".png";
  }

  AfficheCoureur(runner: any): Array<any> {
    this.timings = [
      {Split1img: "img1", Split1time: runner.split1Time, Split1gap: runner.split1Gap},
      {Split2img: "img2", Split2time: runner.split2Time, Split2gap: runner.split2Gap},
      {Split3img: "img3", Split3time: runner.split3Time, Split3gap: runner.split3Gap},
      {Split4img: "img4", Split4time: runner.split4Time, Split4gap: runner.split4Gap},
      {Split5img: "img5", Split5time: runner.split5Time, Split5gap: runner.split5Gap},
      {Finishimg: "img6", Finishtime: runner.finishTime, Finishgap: runner.finishGap},
    ];
const emptyTimeKeys = this.timings.reduce((emptyKeys: any, current: any, index: number) => {
const keyPrefix = index < this.timings.length - 1 ? 'Split' + (index + 1) : 'Finish';
if (current[keyPrefix + 'time'] === '') {
emptyKeys.push(keyPrefix);
}
return emptyKeys;
}, []);
this.tableData = ['img', 'time', 'gap'].map(prop => {
return this.timings.reduce((acc: any, current: any, index: any) => {
 const keyPrefix = index < this.timings.length - 1 ? 'Split' + (index + 1) : 'Finish';
 if (!emptyTimeKeys.includes(keyPrefix)) {
   const key = keyPrefix + prop;
   acc[keyPrefix] = current[key];
 }
 return acc;
}, {});
});
  console.log(this.timings);
  return this.timings;
  }

}
function getRunnerBibIndex(selectedRunner$: number): Runner {
  throw new Error('Function not implemented.');
}

function getRunnerBib(selectedRunner$: number): Runner {
  throw new Error('Function not implemented.');
}

