import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Runner } from 'src/app/dtflux-ui-model/core.model/Runner';
import { RunnerResult } from 'src/app/dtflux-ui-model/core.model/RunnerResult';
import { RunnerResults } from 'src/app/dtflux-ui-model/core.model/RunnerResults';
import { ILiveResult } from 'src/app/dtflux-ui-model/race-result.model/ILiveResult';
import { MockingService } from 'src/app/services/mocking.service';
import { SelectedRunnerService } from 'src/app/services/selected-runner.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.sass']
})

export class StreamComponent implements OnInit {
  _runnerResults: RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  subSelectedRunner!: Subscription;
  tableData: any[] = [];
  props: string[] = ['img', 'time', 'gap'];
  selectedRunner: number = 1;
  runner?: RunnerResult
  timings: any[] = [];
  runnerActuel?: RunnerResult;

  constructor(private _liveResultService: WebsocketService, private _selectedRunnerService: SelectedRunnerService) {
    this.subSelectedRunner = this._selectedRunnerService.subscribeSelectedRunner().subscribe({
      next: (selected: number) => {
        this.selectedRunner = selected;
        const runnerActuel = this._runnerResults.getRunnerResultBib(this.selectedRunner);
        if (runnerActuel) this.runnerActuel = runnerActuel;
        this.AfficheCoureur();
      }
    });


    this.subRunnerResult = this._liveResultService.subscribeWsLiveResult().subscribe({
      next: (runners: any) => {
        console.log(runners)
        this._runnerResults = new RunnerResults(runners);
        if (this.selectedRunner) {
          this.runnerActuel = this.getActualRunner(this.selectedRunner);
          this.AfficheCoureur();
        }
      }
    });

  }

  getActualRunner(bib: number): RunnerResult | undefined {
    for (let index = 0; index < this._runnerResults.length; index++) {
      if (this._runnerResults[index].bib === bib)
      // console.log(this._runnerResults[index].bib);
      // console.log(bib);
      return this._runnerResults[index];
    }
    return undefined;
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
    if (value)
      return value.startsWith('img');
    return false;
  }

  getDynamicImageLink(): string {
    if (this.runnerActuel)
      return `/assets/Medias/Course-stream/Nomcourse-${this.runnerActuel.contestId}-${this.runnerActuel.stageId}.png`;
    return "";
  }

  AfficheCoureur(): Array<any> {
    if (this.runnerActuel) {
      this.timings = [
        { Split1img: "img1", Split1time: this.runnerActuel.split1Time, Split1gap: this.runnerActuel.split1Gap },
        { Split2img: "img2", Split2time: this.runnerActuel.split2Time, Split2gap: this.runnerActuel.split2Gap },
        { Split3img: "img3", Split3time: this.runnerActuel.split3Time, Split3gap: this.runnerActuel.split3Gap },
        { Split4img: "img4", Split4time: this.runnerActuel.split4Time, Split4gap: this.runnerActuel.split4Gap },
        { Split5img: "img5", Split5time: this.runnerActuel.split5Time, Split5gap: this.runnerActuel.split5Gap },
        { Finishimg: "img6", Finishtime: this.runnerActuel.finishTime, Finishgap: this.runnerActuel.finishGap },
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
      // console.log(this.timings);
      return this.timings;
    }
    return new Array<any>();
  }

}


