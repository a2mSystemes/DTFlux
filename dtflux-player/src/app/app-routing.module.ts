import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
import { StreamFullComponent } from './displays/stream-full/stream-full.component';

const routes: Routes = [
  { path: 'control', component: ControlCenterComponent},
  { path: 'arch-finish-1', component: ArchFinish1Component},
  { path: 'arch-finish-2', component: ArchFinish2Component},
  { path: 'arch-finish-3', component: ArchFinish3Component},
  { path: 'arch-finish-4', component: ArchFinish4Component},
  { path: 'arch-spotter-1', component: ArchSpotter1Component},
  { path: 'arch-spotter-2', component: ArchSpotter2Component},
  { path: 'arch-spotter-3', component: ArchSpotter3Component},
  { path: 'arch-spotter-4', component: ArchSpotter4Component},
  { path: 'start', component: StartComponent},
  { path: 'column', component: ColumnComponent},
  { path: 'info-etape', component: InfoEtapeComponent},
  { path: 'stream', component: StreamComponent},
  { path: 'stream-full', component: StreamFullComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
