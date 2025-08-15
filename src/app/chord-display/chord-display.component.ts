import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Voicing } from '../chord';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.css']
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

  dots: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.beat) {
      this.dots = Array(this.beat).fill(0).map((x, i) => i);
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