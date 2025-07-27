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
    'Bbm': [{ fingering: [null, 1, 3, 3, 2, 1], barre: { fret: 1, startString: 0, endString: 5 } }]
  };

  beat = 4;
  dot = -1;
  // randomNumberGenerator : Observable<number>;
  sub;
  majorChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'Eb', 'F#', 'Ab', 'Bb'];
  // chords =['C','D','E','F','G','A','B','C#','Eb','F#','Ab','Bb','Cm','Dm','Em','Fm','Gm','Am','Bm','C#m','Ebm','F#m','Abm','Bbm'];
  minorChords = ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', 'C#m', 'Ebm', 'F#m', 'Abm', 'Bbm'];
  chords = this.majorChords.concat(this.minorChords);
  selChords = [];
  canStart: Boolean = false;
  started: Boolean = false;
  randomizeOn: boolean = false;

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
    this.canStart = true;

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
    if (this.randomizeOn) {

      this.sub = setInterval(() => {
        beatCount++;
        this.dot = beatCount % this.beat + 1;
        if (beatCount % this.beat == 0) {
          this.generateRandomNumbers().subscribe(function (value) {
            val = value;

          });
          this.flag = true;
        }else{
          this.flag = false;
        }

        this.playTone();
        if (this.selChords.length > 0) {
          if(this.flag){
            this.chord = this.nextChord;
            this.currentChordFingering = this.chordFingeringMap[this.chord][0];
          }
          this.nextChord = this.selChords[val];
        } else {
          if(this.flag){
            this.chord = this.nextChord;
            this.currentChordFingering = this.chordFingeringMap[this.chord][0];
          }
          this.nextChord = this.chords[val];
        }
      }, this.intVal)
    } else {
      val = 0;
      this.sub = setInterval(() => {
        this.dot = beatCount % this.beat + 1;
        beatCount++;
        if (this.selChords.length > 0) {

          if (val == this.selChords.length) {
            val = 0;
          }
          if(this.flag){
            this.chord = this.nextChord;
            this.currentChordFingering = this.chordFingeringMap[this.chord][0];
          }
          
          this.nextChord = this.selChords[val];
        } else {
          this.all();
          if(this.flag){
            this.chord = this.nextChord;
            this.currentChordFingering = this.chordFingeringMap[this.chord][0];
          }
          this.nextChord = this.chords[val];
        }
        
        this.playTone();
        if (beatCount % this.beat == 0) {
         
          val++;
          this.flag = true;
        }else{
          this.flag = false;
        }
        
        
      }, this.intVal)
    }
    this.canStart = false;
    this.started = true;

  }

  randomize() {
    if (!this.randomizeOn) {
      this.randomizeOn = true;
      this.stop();
      this.start();
    } else {
      this.randomizeOn = false;
      this.stop();
      this.start();
    }

  }
  major() {
    this.selChords = this.majorChords;
  }

  minor() {
    this.selChords = this.minorChords;
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

    this.canStart = true;
    this.started = false;
  }
  generateRandomNumbers() {
    let randomNumberGen;
    let randNum = 0;
    let modu = 0;
    if (this.selChords.length > 0) {
      modu = this.selChords.length;
    } else {
      modu = this.chords.length;
    }

    randomNumberGen = Observable.create(function (observer) {

      randNum = observer.next(Math.floor(Math.random() * 100) % modu);

    });

    return randomNumberGen;
  }


  playTone(){
    let audio = new Audio();
    audio.src= "../assets/tones/Bass-Drum-2.wav";
    audio.load();
    audio.volume = 0.5;
    audio.play();
  }
}
