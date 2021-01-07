import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraphicComponent } from './graphic/graphic.component';

import { RhythmChannelComponent } from './rhythm-channel/rhythm-channel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './services/data.service';
import {SignalsService} from './services/signals.service';


@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    RhythmChannelComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DataService,SignalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
