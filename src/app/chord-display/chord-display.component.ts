import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Voicing } from '../chord';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.css']
})
export class ChordDisplayComponent {
  @Input() chord: string;
  @Input() nextChord: string;
  @Input() voicing: Voicing;
  @Input() dot: number;
  @Input() started: boolean;
  @Input() muted: boolean;
  @Input() tempo: number;
  @Input() beat: number;

  @Output() start = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
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