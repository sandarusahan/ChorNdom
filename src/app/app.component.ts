import {
  Component
} from '@angular/core';
import {
  Observable,
  interval,
  Subscription
} from 'rxjs';
import { Chord, Voicing } from './chord';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chondom';
  nextChord = ':)';
  chord = ':D';
  currentChordFingering: Voicing = { fingering: [] };

  chordFingeringMap: Chord = {
    'C': [{ fingering: [null, 3, 2, 0, 1, 0] }, { fingering: [8, 10, 10, 9, 8, 8], barre: { fret: 8, startString: 0, endString: 5 } }],
    'D': [{ fingering: [null, null, 0, 2, 3, 2] }, { fingering: [10, 12, 12, 11, 10, 10], barre: { fret: 10, startString: 0, endString: 5 } }],
    'E': [{ fingering: [0, 2, 2, 1, 0, 0] }],
    'F': [{ fingering: [1, 3, 3, 2, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'G': [{ fingering: [3, 2, 0, 0, 0, 3] }, { fingering: [3, 5, 5, 4, 3, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'A': [{ fingering: [null, 0, 2, 2, 2, 0] }, { fingering: [5, 7, 7, 6, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'B': [{ fingering: [null, 2, 4, 4, 4, 2], barre: { fret: 2, startString: 0, endString: 5 } }, { fingering: [7, 9, 9, 8, 7, 7], barre: { fret: 7, startString: 0, endString: 5 } }],
    'C#': [{ fingering: [null, 4, 6, 6, 6, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Eb': [{ fingering: [null, 6, 8, 8, 8, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'F#': [{ fingering: [2, 4, 4, 3, 2, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'Ab': [{ fingering: [4, 6, 6, 5, 4, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Bb': [{ fingering: [null, 1, 3, 3, 3, 1], barre: { fret: 1, startString: 0, endString: 5 } }, { fingering: [6, 8, 8, 7, 6, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'Cm': [{ fingering: [null, 3, 5, 5, 4, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'Dm': [{ fingering: [null, null, 0, 2, 3, 1] }, { fingering: [5, 7, 7, 6, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'Em': [{ fingering: [0, 2, 2, 0, 0, 0] }],
    'Fm': [{ fingering: [1, 3, 3, 1, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'Gm': [{ fingering: [3, 5, 5, 3, 3, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'Am': [{ fingering: [null, 0, 2, 2, 1, 0] }, { fingering: [5, 7, 7, 5, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'Bm': [{ fingering: [null, 2, 4, 4, 3, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'C#m': [{ fingering: [null, 4, 6, 6, 5, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Ebm': [{ fingering: [null, 6, 8, 8, 7, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'F#m': [{ fingering: [2, 4, 4, 2, 2, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'Abm': [{ fingering: [4, 6, 6, 4, 4, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Bbm': [{ fingering: [null, 1, 3, 3, 2, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'C7': [{ fingering: [null, 3, 2, 3, 1, 0] }],
    'D7': [{ fingering: [null, null, 0, 2, 1, 2] }],
    'E7': [{ fingering: [0, 2, 0, 1, 0, 0] }],
    'F7': [{ fingering: [1, 3, 1, 2, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'G7': [{ fingering: [3, 2, 0, 0, 0, 1] }],
    'A7': [{ fingering: [null, 0, 2, 0, 2, 0] }],
    'B7': [{ fingering: [null, 2, 1, 2, 0, 2] }],
    'Asus2': [{ fingering: [null, 0, 2, 2, 0, 0] }],
    'Asus4': [{ fingering: [null, 0, 2, 2, 3, 0] }],
    'Dsus2': [{ fingering: [null, null, 0, 2, 3, 0] }],
    'Dsus4': [{ fingering: [null, null, 0, 2, 3, 3] }],
    'Esus4': [{ fingering: [0, 2, 2, 2, 0, 0] }]
  };

  beat = 4;
  dot = -1;
  // randomNumberGenerator : Observable<number>;
  sub;
  majorChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'Eb', 'F#', 'Ab', 'Bb'];
  // chords =['C','D','E','F','G','A','B','C#','Eb','F#','Ab','Bb','Cm','Dm','Em','Fm','Gm','Am','Bm','C#m','Ebm','F#m','Abm','Bbm'];
  minorChords = ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', 'C#m', 'Ebm', 'F#m', 'Abm', 'Bbm'];
  seventhChords = ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'];
  suspendedChords = ['Asus2', 'Asus4', 'Dsus2', 'Dsus4', 'Esus4'];
  chords = this.majorChords.concat(this.minorChords, this.seventhChords, this.suspendedChords);
  circleOfFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];
  selChords = [];
  started: Boolean = false;
  progressionMode: 'sequential' | 'random' | 'circleOfFifths' = 'sequential';
  editingTempo: boolean = false;
  muted: boolean = true;

  intVal = 60000/100;
  tempo = 100;
  flag: boolean = false;
  ngOnInit() {

  }

  selCardOnClick(index) {
    console.log(index);
    this.selChords.splice(index + 1,0,this.selChords[index])
  }
  cardOnClick(index) {
    // if (!this.selChords.includes(this.chords[index])) {
      this.selChords.push(this.chords[index])
    // } else {
      // this.selChords.splice(this.selChords.indexOf(this.chords[index]), 1)
    // }

  }
  interVal() {
    this.intVal = 60000 / this.tempo;
  }

  editTempo() {
    this.editingTempo = true;
  }

  updateTempo() {
    if (this.tempo < 1) {
      this.tempo = 1;
    }
    if (this.tempo > 500) {
      this.tempo = 500;
    }
    this.editingTempo = false;
    this.interVal();
    if (this.started) {
      this.stop();
      this.start();
    }
  }

  changeBeat(beat:number){

    this.beat = beat

  }
  start() {
    let beatCount = 0;
    if (this.started) {
      this.stop();
    }
    let val: number = 0;
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

    this.sub = setInterval(() => {
      this.dot = beatCount % this.beat + 1;
      beatCount++;

      if (beatCount % this.beat == 0) {
        if (this.progressionMode === 'random') {
          this.generateRandomNumbers(progressionChords.length).subscribe(value => {
            val = value;
          });
        } else {
          val = (val + 1) % progressionChords.length;
        }
        this.flag = true;
      } else {
        this.flag = false;
      }

      this.playTone();

      if (this.flag) {
        this.chord = this.nextChord;
        this.currentChordFingering = this.chordFingeringMap[this.chord][0];
      }
      this.nextChord = progressionChords[val];

    }, this.intVal);

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
  major() {
    this.selChords = this.majorChords;
  }

  minor() {
    this.selChords = this.minorChords;
  }

  seventh() {
    this.selChords = this.seventhChords;
  }

  suspended() {
    this.selChords = this.suspendedChords;
  }

  all() {
    this.selChords = this.chords.slice();
  }

  clearAll() {
    this.selChords = [];
  }
  stop() {
    clearInterval(this.sub)
    // this.sub.unsubscribe();
    console.log('stoped')

    this.started = false;
  }
  generateRandomNumbers(max: number) {
    return new Observable<number>(observer => {
      const randNum = Math.floor(Math.random() * max);
      observer.next(randNum);
      observer.complete();
    });
  }


  toggleMute() {
    this.muted = !this.muted;
  }

  playTone(){
    if (!this.muted) {
      let audio = new Audio();
      audio.src= "../assets/tones/Bass-Drum-2.wav";
      audio.load();
      audio.volume = 0.5;
      audio.play();
    }
  }
}
