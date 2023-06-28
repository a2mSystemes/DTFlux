import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Hd1080Component } from './pages/hd1080/hd1080.component';
import { Hd720Component } from './pages/hd720/hd720.component';

const routes: Routes = [
  { path: 'hd720', component: Hd720Component},
  { path: 'hd1080', component: Hd1080Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
