import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { MockingService } from 'src/app/services/mocking.service';
import { WebsocketService } from 'src/app/services/network/websocket.service';
import { SelectedRunnerService } from 'src/app/services/selected-runner.service';

@Component({
  selector: 'app-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.sass']
})


export class ControlCenterComponent implements OnInit {
 protected bibValue: any;

  constructor(private _httpClient: HttpClient, private _configService: ConfigService, private _selectedRunner: SelectedRunnerService) {

  }
  ngOnInit(): void {

  }

  XP(): void {
   this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/contest/change/2').subscribe(data => {
   });
  }

  XPSHomme(): void {
    this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/contest/change/3').subscribe(data => {
    });
   }

   XPSFemme(): void {
    this.XPSHomme();
   }

   XPSRelai(): void {
    this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/contest/change/3').subscribe(data => {
    });
   }

   XPDisplay(): void{

   }

//
   XPSHommeDisplay(): void{}

   XPSFemmeDisplay():void{}

   XPSRelaiDisplay():void{}

    kilo(): void {
      console.log("Etape kilo")
      this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/stage/change/1').subscribe(data => {});
     }

    mega(): void {
      console.log("Etape mega")
      //envoyer un reset Millumin
      this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/stage/change/2').subscribe(data => {});
     }

    giga(): void {
      console.log("Etape giga")
      //envoyer un reset Millumin
      this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/stage/change/3').subscribe(data => {});


     }

    tera(): void {
      console.log("Etape tera")
      //envoyer un reset Millumin
      this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/stage/change/4').subscribe(data => {});

     }

    peta(): void {
      console.log("Etape peta")
      //envoyer un reset Millumin
      this._httpClient.get(this._configService.getConf("dtfluxApiBaseUrl") + 'commands/stage/change/5').subscribe(data => {});

     }

     kilo2(): void {
      console.log("Etape kilo 2")
     }

    mega2(): void {
      console.log("Etape mega 2")
     }

    giga2(): void {
      console.log("Etape giga 2")
     }

    tera2(): void {
      console.log("Etape tera 2")
     }

    peta2(): void {
      console.log("Etape peta 2")
     }

     waiting(): void {
      console.log("Enleve le wainting 1")
     }


     validerMaillot(): void {
      console.log("valider maillot " + this.bibValue);
      this._selectedRunner.setSelected(this.bibValue);
     }

}
