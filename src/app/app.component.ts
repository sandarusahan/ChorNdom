import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, OnInit
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import { Voicing } from './chord';
import { AudioService } from './audio.service';
import { ChordService } from './chord.service';
import { MetronomeService } from './metronome.service';
import { CircleOfFifthsComponent } from './circle-of-fifths/circle-of-fifths.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Practice On Strings';
  nextChord = ':)';
  chord = ':D';
  currentChordFingering: Voicing = { fingering: [] };

  beat = 4;
  denominator = 4;
  dot = -1;
  
  chords: string[];
  circleOfFifths: string[];
  selChords: string[] = [];
  started: Boolean = false;
  isPaused: Boolean = false;
  progressionMode: 'sequential' | 'random' | 'circleOfFifths' = 'sequential';
  editingTempo: boolean = false;
  muted: boolean = true;

  tempo = 100;
  
  private metronomeSubscription: Subscription;
  private progressionIndex = 0;
  private familyJustSelected = false;

  constructor(
    private audioService: AudioService,
    private chordService: ChordService,
    private metronomeService: MetronomeService
  ) {
    this.chords = this.chordService.getAllChords();
    this.circleOfFifths = this.chordService.getChords('circleOfFifths');
  }

  ngOnInit() {
  }

  selCardOnClick(index: number) {
    console.log(index);
    this.selChords.splice(index + 1, 0, this.selChords[index])
  }
  cardOnClick(chord: string) {
    this.selChords.push(chord)
  }

  removeChord(index: number) {
    this.selChords.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selChords, event.previousIndex, event.currentIndex);
  }

  editTempo() {
    this.editingTempo = true;
  }

  updateTempo(tempo: number) {
    this.tempo = tempo;
    if (this.tempo < 1) {
      this.tempo = 1;
    }
    if (this.tempo > 500) {
      this.tempo = 500;
    }
    this.editingTempo = false;
    if (this.started) {
      this.stop();
      this.start();
    }
  }

  changeBeat(beat: number) {
    this.beat = beat
  }

  private getProgressionChords(): string[] {
    switch (this.progressionMode) {
      case 'sequential':
      case 'random':
        return this.selChords.length > 0 ? this.selChords : this.chords;
      case 'circleOfFifths':
        return this.selChords;
    }
  }

  async start() {
    if (!this.started) {
      await this.audioService.loadSound('../assets/tones/Bass-Drum-2.wav');
      this.audioService.setMuted(this.muted);
      this.progressionIndex = 0;
    }

    if (this.isPaused) {
      this.metronomeService.resume();
      this.isPaused = false;
    } else {
      const initialProgressionChords = this.getProgressionChords();
      if (initialProgressionChords.length === 0) {
        return;
      }
      this.nextChord = initialProgressionChords[this.progressionIndex];

      this.metronomeService.setTempo(this.tempo);
      this.metronomeService.start();
      let beatCount = 0;
      this.metronomeSubscription = this.metronomeService.beat$.subscribe((beat) => {
        this.dot = beat.beat;
        beatCount++;

        if (!this.muted) {
          // The audio is now played by the metronome service
        }

        if (beatCount % this.beat == 0) {
          this.chord = this.nextChord;
          const voicings = this.chordService.getChord(this.chord);
          if (voicings && voicings.length > 0) {
            this.currentChordFingering = voicings[0];
          }

          const progressionChords = this.getProgressionChords();
          
          if (progressionChords.length === 0) {
              this.stop();
              return;
          }

          if (this.progressionIndex >= progressionChords.length) {
              this.progressionIndex = 0;
          }

          if (this.progressionMode === 'random') {
            this.progressionIndex = Math.floor(Math.random() * progressionChords.length);
          } else {
            this.progressionIndex = (this.progressionIndex + 1) % progressionChords.length;
          }
          this.nextChord = progressionChords[this.progressionIndex];
        }
      });
    }

    this.started = true;
  }

  setProgression(mode: 'sequential' | 'random' | 'circleOfFifths') {
    this.progressionMode = mode;
    if (this.started) {
      this.stop();
      this.start();
    }
  }

  randomize() {
    if (this.progressionMode !== 'random') {
      this.setProgression('random');
    } else {
      this.setProgression('sequential');
    }
  }

  onSelectChordType(type: string) {
    this.selChords = this.chordService.getChords(type);
  }

  onFamilyChordsSelected(chords: string[]) {
    this.selChords = chords;
    this.familyJustSelected = true;
  }

  onCircleChordSelected(chord: string) {
    if (this.familyJustSelected) {
      this.selChords = [chord];
      this.familyJustSelected = false;
    } else {
      this.selChords.push(chord);
    }
  }
  onTimeSignatureChange({ numerator, denominator }: { numerator: number, denominator: number }) {
    this.metronomeService.setTimeSignature(numerator, denominator);
    this.beat = numerator;
    this.denominator = denominator;
  }

  all() {
    this.selChords = this.chordService.getAllChords().slice();
  }

  clearAll() {
    this.selChords = [];
  }
  stop() {
    this.metronomeService.stop();
    if (this.metronomeSubscription) {
      this.metronomeSubscription.unsubscribe();
    }
    this.progressionIndex = 0;
    this.started = false;
    this.isPaused = false;
    this.dot = -1;
    this.chord = ':D';
    this.nextChord = ':)';
    this.currentChordFingering = { fingering: [] };
  }

  pause() {
    if (this.started && !this.isPaused) {
      this.metronomeService.pause();
      this.isPaused = true;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    this.audioService.setMuted(this.muted);
  }
}
