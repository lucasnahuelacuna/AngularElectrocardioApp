import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphicComponent } from './graphic/graphic.component';
import { RhythmChannelComponent } from './rhythm-channel/rhythm-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphicComponent,
    RhythmChannelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
