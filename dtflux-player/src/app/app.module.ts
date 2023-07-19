import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './displays/column/column.component';
import { ControlCenterComponent } from './displays/control-center/control-center.component';
import { IsoComponent } from './components/iso/iso.component';
import { ClassementComponent } from './components/classement/classement.component';
import { InfoEtapeComponent } from './displays/info-etape/info-etape.component';
import { StartComponent } from './displays/start/start.component';
import { ArchFinish1Component } from './displays/arch-finish1/arch-finish1.component';
import { ArchFinish2Component } from './displays/arch-finish2/arch-finish2.component';
import { ArchFinish3Component } from './displays/arch-finish3/arch-finish3.component';
import { ArchFinish4Component } from './displays/arch-finish4/arch-finish4.component';
import { ArchSpotter4Component } from './displays/arch-spotter4/arch-spotter4.component';
import { ArchSpotter3Component } from './displays/arch-spotter3/arch-spotter3.component';
import { ArchSpotter2Component } from './displays/arch-spotter2/arch-spotter2.component';
import { ArchSpotter1Component } from './displays/arch-spotter1/arch-spotter1.component';
import { StreamComponent } from './displays/stream/stream.component';
import { MockingService } from './services/mocking.service';
import { StreamFullComponent } from './displays/stream-full/stream-full.component';
import { PrivateComponent } from './components/private/private.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnComponent,
    ControlCenterComponent,
    IsoComponent,
    ClassementComponent,
    InfoEtapeComponent,
    StartComponent,
    ArchFinish1Component,
    ArchFinish2Component,
    ArchFinish3Component,
    ArchFinish4Component,
    ArchSpotter4Component,
    ArchSpotter3Component,
    ArchSpotter2Component,
    ArchSpotter1Component,
    StreamComponent,
    StreamFullComponent,
    PrivateComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [MockingService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
