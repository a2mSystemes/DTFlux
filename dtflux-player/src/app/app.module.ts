import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Hd1080Component } from './pages/hd1080/hd1080.component';
import { Hd720Component } from './pages/hd720/hd720.component';

@NgModule({
  declarations: [
    AppComponent,
    Hd1080Component,
    Hd720Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
