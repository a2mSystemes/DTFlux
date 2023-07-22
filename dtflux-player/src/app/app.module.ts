import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColumnComponent } from './displays/column/column.component';
import { ControlCenterComponent } from './displays/control-center/control-center.component';
import { IsoComponent } from './components/iso/iso.component';
import { ClassementComponent } from './components/classement/classement.component';
import { InfoEtapeComponent } from './displays/info-etape/info-etape.component';
import { StartComponent } from './displays/start/start.component';
import { ArchFinish1Component } from './displays/arch-finish1/arch-finish1.component';
import { ArchSpotter1Component } from './displays/arch-spotter1/arch-spotter1.component';
import { StreamComponent } from './displays/stream/stream.component';
import { MockingService } from './services/mocking.service';
import { StreamFullComponent } from './displays/stream-full/stream-full.component';
import { ColumnFComponent } from './displays/column-f/column-f.component';
import { ColumnWinnerComponent } from './displays/column-winner/column-winner.component';
import { PodiumComponent } from './displays/podium/podium.component';
import { PrivateComponent } from './components/private/private.component';
import { FormsModule } from '@angular/forms';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { ColumnHComponent } from './displays/column-h/column-h.component';
import { ColumnArcheComponent } from './displays/column-arche/column-arche.component';
import { ColumnArcheFComponent } from './displays/column-arche-f/column-arche-f.component';
import { ColumnArcheHComponent } from './displays/column-arche-h/column-arche-h.component';

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
    ArchSpotter1Component,
    StreamComponent,
    StreamFullComponent,
    ColumnFComponent,
    ColumnWinnerComponent,
    PodiumComponent,
    PrivateComponent,
    StopwatchComponent,
    ColumnHComponent,
    ColumnArcheComponent,
    ColumnArcheFComponent,
    ColumnArcheHComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MockingService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
