import { Injectable } from '@angular/core';
import { interval, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetronomeService {
  private tempo$ = new BehaviorSubject<number>(100);
  private stop$ = new Subject<void>();
  public beat$ = this.tempo$.pipe(
    switchMap(tempo => interval(60000 / tempo).pipe(takeUntil(this.stop$)))
  );

  constructor() { }

  start(tempo: number) {
    this.tempo$.next(tempo);
  }

  stop() {
    this.stop$.next();
  }
}