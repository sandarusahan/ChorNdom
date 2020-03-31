import { Component } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chondom';
  chord = ':)';
  
  // randomNumberGenerator : Observable<number>;
  intObs : Observable<number>;
  sub;
  majorChords =['C','D','E','F','G','A','B','C#','Eb','F#','Ab','Bb'];
  chords =['C','D','E','F','G','A','B','C#','Eb','F#','Ab','Bb','Cm','Dm','Em','Fm','Gm','Am','Bm','C#m','Ebm','F#m','Abm','Bbm'];
  minorChords =['Cm','Dm','Em','Fm','Gm','Am','Bm','C#m','Ebm','F#m','Abm','Bbm'];
  selChords = [];
  canStart:Boolean = false;
  started:Boolean = false;
  intVal = 0;
  ngOnInit()
  {
    
  }  
  
  selCardOnClick(index){
    console.log(index);
    this.selChords.splice(index,1)
  }
  cardOnClick(index){
    console.log(index);
    if(!this.selChords.includes(this.chords[index]))
        this.selChords.push(this.chords[index])
  }
  interVal(event){
    this.intVal = event.target.value*1000;
    console.log(this.intVal)
    this.canStart = true;
    this.intObs = interval(this.intVal);
    
  }
  start(){
    let val:number =0;
    
    this.sub = setInterval(()=>{
      this.generateRandomNumbers().subscribe(function(value) {
               val = value;
               
          });
          if(this.selChords.length > 0){
            this.chord = this.selChords[val];
          }else {
            this.chord = this.chords[val];
          }
    }, this.intVal)

    this.canStart = false;
    this.started = true;
    // this.sub = this.intObs.subscribe(int => {
    //   numb = int;
    //   this.generateRandomNumbers().subscribe(function(value) {
    //        val = value;
    //   });
    //   this.chord = this.chords[val];
    // })


  }

  major(){
    this.selChords = this.majorChords;
  }

  minor(){
    this.selChords = this.minorChords;
  }

  all(){
    this.selChords = this.chords;
  }
  stop(){
    clearInterval(this.sub)
    // this.sub.unsubscribe();
    console.log('stoped')

    this.canStart = true;
  }
  generateRandomNumbers(){
    let randomNumberGen;
    let randNum = 0;    
    let modu = 0;
    if(this.selChords.length > 0){
      modu = this.selChords.length;
    }else {
      modu = this.chords.length;
    }
    
    randomNumberGen = Observable.create(function(observer) {

      randNum = observer.next(Math.floor(Math.random() * 100)%modu);
      
    });
    
    return randomNumberGen;
  }
}
    
