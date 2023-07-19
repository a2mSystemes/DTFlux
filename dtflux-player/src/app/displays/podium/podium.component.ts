import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Runner, RunnerResult, RunnerResults } from 'src/app/dtflux-ui-model/IRunner';
import { MockingService } from 'src/app/services/mocking.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.sass']
})
export class PodiumComponent implements OnInit{
  _runnersResult$:RunnerResults = new RunnerResults();
  subRunnerResult!: Subscription;
  tableData: any[] = [];
  runner?: RunnerResult;
  firstRunner: RunnerResult = new RunnerResult();
  secondRunner?: RunnerResult;
  thirdRunner?: RunnerResult;

  constructor(private _mockingService:MockingService){
    this.subRunnerResult = this._mockingService.subscribeRunnersResults().subscribe({next : (runners: Array<RunnerResult>) => {
      this._runnersResult$.runners = runners;
      this.firstRunner = this._runnersResult$.getRunnerResultRank(1);
      this.secondRunner = this._runnersResult$.getRunnerResultRank(2);
      this.thirdRunner = this._runnersResult$.getRunnerResultRank(3);
      }
    })};

    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
  }

