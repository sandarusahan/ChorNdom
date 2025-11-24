import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Voicing } from '../chord';
import { FretboardComponent } from '../fretboard/fretboard.component';

@Component({
  selector: 'app-chord-display',
  standalone: true,
  imports: [CommonModule, FretboardComponent],
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.css'],
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