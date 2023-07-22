import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';
import { SelectedRunnerService } from 'src/app/services/selected-runner.service';
import { StopwatchComponent } from 'src/app/components/stopwatch/stopwatch.component';
import { SelectionService } from 'src/app/services/backend/selection.service';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.sass'],
})
export class ControlCenterComponent implements OnInit {
  protected bibValue: any;
  chronodatasHService: any;
  kiloTime: any;
  megaTime: any;
  gigaTime: any;
  teraTime: any;
  petaTime: any;

  stageName?: string;
  contestName?: string;
  protected constestId?:number;
  protected stagetId?: number;

  constructor(
    private _httpClient: HttpClient,
    private _configService: ConfigService,
    private _selectedRunner: SelectedRunnerService,
    private _selectionContestService: SelectionService,
    private _selectionStageService: SelectionService
  ) {
    this._selectionContestService.subscribeContestChange().subscribe((contestChange) => {
      this.constestId = contestChange;
    });
    this._selectionStageService.subscribeStageChange().subscribe((stageChange) => {
      this.stagetId = stageChange;
    });
  }
  ngOnInit(): void {}

  XP(): void {
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/contest/change/2'
      )
      .subscribe((data) => {
    this._selectionContestService.setCurrentContestId(2);

      });
  }

  XPSHomme(): void {
    this.constestId = 3; // TODO faire filtre homme
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/contest/change/3'
      )
      .subscribe((data) => {});
    this._selectionContestService.setCurrentContestId(3);
  }

  XPSFemme(): void {
    this.constestId = 3; // TODO faire filtre femme
    this.XPSHomme();
  }

  XPSRelai(): void {
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/contest/change/1'
      )
      .subscribe((data) => {});
    this._selectionContestService.setCurrentContestId(1);
  }

  kilo(): void {
    console.log('Etape kilo');
    this.stagetId = 1;
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/stage/change/1'
      )
      .subscribe((data) => {});
  }

  mega(): void {
    console.log('Etape mega');
    //envoyer un reset Millumin
    this.stagetId = 2;
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/stage/change/2'
      )
      .subscribe((data) => {});
  }

  giga(): void {
    console.log('Etape giga');
    //envoyer un reset Millumin
    this.stagetId = 3;
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/stage/change/3'
      )
      .subscribe((data) => {});
  }

  tera(): void {
    console.log('Etape tera');
    //envoyer un reset Millumin
    this.stagetId = 4;
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/stage/change/4'
      )
      .subscribe((data) => {});
  }

  peta(): void {
    console.log('Etape peta');
    //envoyer un reset Millumin
    this.stagetId = 5;
    this._httpClient
      .get(
        this._configService.getConf('dtfluxApiBaseUrl') +
          'commands/stage/change/5'
      )
      .subscribe((data) => {});
  }

  waiting(): void {
    console.log('Enleve le wainting 1');
  }

  validerMaillot(): void {
    console.log('valider maillot ' + this.bibValue);
    this._selectedRunner.setSelected(this.bibValue);
  }

  timing1(): void {
    console.log('prepare chronos 1');
  }

  timing2(): void {
    console.log('prepare chronos 2');
  }

  validerChronos(): void {
    const data = {
      kilo: this.kiloTime,
      mega: this.megaTime,
      giga: this.gigaTime,
      tera: this.teraTime,
      peta: this.petaTime,
    };
    this.chronodatasHService.updateData(data);
  }
}
