import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { AudioService } from './audio.service';

export interface Beat {
  beat: number;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetronomeService {
  private tempo$ = new BehaviorSubject<number>(120);
  private timeSignature$ = new BehaviorSubject<{ numerator: number, denominator: number }>({ numerator: 4, denominator: 4 });
  private isRunning$ = new BehaviorSubject<boolean>(false);
  private isPaused$ = new BehaviorSubject<boolean>(false);
  private timerId?: number;
  private nextBeatTime = 0;
  private beatCount = 0;

  public beat$: Subject<Beat> = new Subject();

  constructor(private audioService: AudioService) { }

  public start() {
    if (this.isRunning$.value) {
      return;
    }
    this.isRunning$.next(true);
    this.nextBeatTime = this.audioService.currentTime;
    this.timerId = window.setInterval(() => this.scheduleBeats(), 25);
  }

  public stop() {
    if (!this.isRunning$.value) {
      return;
    }
    this.isRunning$.next(false);
    this.isPaused$.next(false);
    window.clearInterval(this.timerId);
    this.timerId = undefined;
    this.beatCount = 0;
  }

  public pause() {
    if (!this.isRunning$.value || this.isPaused$.value) {
      return;
    }
    this.isPaused$.next(true);
    window.clearInterval(this.timerId);
    this.timerId = undefined;
  }

  public resume() {
    if (!this.isRunning$.value || !this.isPaused$.value) {
      return;
    }
    this.isPaused$.next(false);
    this.nextBeatTime = this.audioService.currentTime;
    this.timerId = window.setInterval(() => this.scheduleBeats(), 25);
  }

  public setTempo(tempo: number) {
    this.tempo$.next(tempo);
  }

  public setTimeSignature(numerator: number, denominator: number) {
    this.timeSignature$.next({ numerator, denominator });
  }

  private scheduleBeats() {
    const tempo = this.tempo$.value;
    const { numerator, denominator } = this.timeSignature$.value;
    const beatDuration = (60 / tempo) * (4 / denominator);

    while (this.nextBeatTime < this.audioService.currentTime + 0.1) {
      this.beat$.next({ beat: this.beatCount % numerator + 1, time: this.nextBeatTime });
      this.audioService.playSoundAt(this.nextBeatTime);
      this.nextBeatTime += beatDuration;
      this.beatCount++;
    }
  }
}