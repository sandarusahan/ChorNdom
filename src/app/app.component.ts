import {
  Component
} from '@angular/core';
import {
  Observable,
  interval,
  Subscription
} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chondom';
  nextChord = ':)';
  chord = ':D';

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
          }
          this.nextChord = this.selChords[val];
        } else {
          if(this.flag){
            this.chord = this.nextChord;
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
          }
          
          this.nextChord = this.selChords[val];
        } else {
          this.all();
          if(this.flag){
            this.chord = this.nextChord;
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
