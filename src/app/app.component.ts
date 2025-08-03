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


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chondom';
  nextChord = ':)';
  chord = ':D';
  currentChordFingering: Voicing = { fingering: [] };

  beat = 4;
  dot = -1;
  
  chords: string[];
  circleOfFifths: string[];
  selChords: string[] = [];
  started: Boolean = false;
  progressionMode: 'sequential' | 'random' | 'circleOfFifths' = 'sequential';
  editingTempo: boolean = false;
  muted: boolean = true;

  tempo = 100;
  
  private metronomeSubscription: Subscription;
  private progressionIndex = 0;

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

  start() {
    if (this.started) {
      this.stop();
    }
    this.progressionIndex = 0;

    let progressionChords: string[] = [];

    switch (this.progressionMode) {
      case 'sequential':
        progressionChords = this.selChords.length > 0 ? this.selChords : this.chords;
        break;
      case 'random':
        progressionChords = this.selChords.length > 0 ? this.selChords : this.chords;
        break;
      case 'circleOfFifths':
        progressionChords = this.circleOfFifths;
        break;
    }

    if (progressionChords.length === 0) {
      return;
    }

    this.nextChord = progressionChords[this.progressionIndex];

    this.metronomeService.start(this.tempo);
    let beatCount = 0;
    this.metronomeSubscription = this.metronomeService.beat$.subscribe(() => {
      this.dot = beatCount % this.beat + 1;
      beatCount++;

      if (!this.muted) {
        this.audioService.playSound();
      }

      if (beatCount % this.beat == 0) {
        this.chord = this.nextChord;
        const voicings = this.chordService.getChord(this.chord);
        if (voicings && voicings.length > 0) {
          this.currentChordFingering = voicings[0];
        }

        if (this.progressionMode === 'random') {
          this.progressionIndex = Math.floor(Math.random() * progressionChords.length);
        } else {
          this.progressionIndex = (this.progressionIndex + 1) % progressionChords.length;
        }
        this.nextChord = progressionChords[this.progressionIndex];
      }
    });

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
  }

  toggleMute() {
    this.muted = !this.muted;
  }
}
