import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { GraphicComponent } from './graphic/graphic.component';

import { RhythmChannelComponent } from './rhythm-channel/rhythm-channel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {DialogService} from './services/dialog.service';
import {DataService} from './services/data.service';
import {SignalsService} from './services/signals.service';


@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    RhythmChannelComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [DialogService,DataService,SignalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
