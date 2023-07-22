import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ColumnComponent } from './displays/column/column.component';
import { ControlCenterComponent } from './displays/control-center/control-center.component';
import { IsoComponent } from './components/iso/iso.component';
import { ClassementComponent } from './components/classement/classement.component';
import { InfoEtapeComponent } from './displays/info-etape/info-etape.component';
import { StartComponent } from './displays/start/start.component';
import { ArchFinish1Component } from './displays/arch-finish1/arch-finish1.component';
import { ArchSpotter1Component } from './displays/arch-spotter1/arch-spotter1.component';
import { StreamComponent } from './displays/stream/stream.component';
import { StreamFullComponent } from './displays/stream-full/stream-full.component';
import { ColumnWinnerComponent } from './displays/column-winner/column-winner.component';
import { ColumnFComponent } from './displays/column-f/column-f.component';
import { PodiumComponent } from './displays/podium/podium.component';
import { PrivateComponent } from './components/private/private.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { ColumnHComponent } from './displays/column-h/column-h.component';
import { ColumnArcheFComponent } from './displays/column-arche-f/column-arche-f.component';
import { ColumnArcheComponent } from './displays/column-arche/column-arche.component';
import { ColumnArcheHComponent } from './displays/column-arche-h/column-arche-h.component';

const routes: Routes = [
  { path: 'control', component: ControlCenterComponent},
  { path: 'arch-finish-1', component: ArchFinish1Component},
  { path: 'arch-spotter-1', component: ArchSpotter1Component},
  { path: 'start', component: StartComponent},
  { path: 'column', component: ColumnComponent},
  { path: 'info-etape', component: InfoEtapeComponent},
  { path: 'stream', component: StreamComponent},
  { path: 'stream-full', component: StreamFullComponent},
  { path: 'column-winner', component:ColumnWinnerComponent},
  { path: 'column-f', component:ColumnFComponent},
  { path: 'podium', component:PodiumComponent},
  { path: 'stream-full', component: StreamFullComponent},
  { path: 'private', component: PrivateComponent},
  { path: 'watch', component: StopwatchComponent},
  { path: "column-h", component: ColumnHComponent},
  { path: "column-arche", component: ColumnArcheComponent},
  { path: "column-arche-f", component:ColumnArcheFComponent},
  {path: "column-arche-h", component: ColumnArcheHComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
