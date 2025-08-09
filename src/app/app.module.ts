import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FretboardComponent } from './fretboard/fretboard.component';
import { AudioService } from './audio.service';
import { ChordService } from './chord.service';
import { MetronomeService } from './metronome.service';
import { ChordDisplayComponent } from './chord-display/chord-display.component';
import { ControlsComponent } from './controls/controls.component';
import { ChordSelectorComponent } from './chord-selector/chord-selector.component';
import { CircleOfFifthsModule } from './circle-of-fifths/circle-of-fifths.module';

@NgModule({
  declarations: [
    AppComponent,
    FretboardComponent,
    ChordDisplayComponent,
    ControlsComponent,
    ChordSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CircleOfFifthsModule
  ],
  providers: [
    AudioService,
    ChordService,
    MetronomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
