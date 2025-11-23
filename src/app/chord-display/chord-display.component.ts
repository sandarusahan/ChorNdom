import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Voicing } from '../chord';
import { FretboardComponent } from '../fretboard/fretboard.component';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-chord-display',
  standalone: true,
  imports: [CommonModule, FretboardComponent],
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ]),
    trigger('slideDown', [
      state('void', style({ transform: 'translateY(0)', opacity: 1 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('0ms')
      ]),
      transition(':leave', [
        animate('350ms cubic-bezier(0.4, 0, 0.6, 1)', style({ transform: 'translateY(-30px)', opacity: 0 }))
      ])
    ]),
    trigger('chordReveal', [
      state('void', style({ opacity: 0, transform: 'translateY(15px) scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition(':enter', [
        animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)')
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 0.6, 1)', style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }))
      ])
    ])
  ]
})
export class ChordDisplayComponent implements OnChanges {
  @Input() chord: string;
  @Input() nextChord: string;
  @Input() voicing: Voicing;
  @Input() dot: number;
  @Input() started: boolean;
  @Input() isPaused: boolean;
  @Input() muted: boolean;
  @Input() tempo: number;
  @Input() beat: number;
  @Input() denominator: number;
  @Input() isCountingDown: boolean = false;
  @Input() countdownValue: number = 3;

  dots: number[] = [];
  isChordChanging = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.beat) {
      this.dots = Array(this.beat).fill(0).map((x, i) => i);
    }

    if (changes.chord && !changes.chord.firstChange) {
      this.isChordChanging = true;
      setTimeout(() => {
        this.isChordChanging = false;
      }, 300);
    }
  }

  @Output() start = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() toggleMute = new EventEmitter<void>();
  @Output() updateTempo = new EventEmitter<number>();

  editingTempo = false;

  editTempo() {
    this.editingTempo = true;
  }

  onUpdateTempo() {
    this.editingTempo = false;
    this.updateTempo.emit(this.tempo);
  }
}