import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ControlsComponent {
  @Input() beat: number;
  @Input() progressionMode: 'sequential' | 'random' | 'circleOfFifths';
  @Input() started: boolean = false;
  @Input() isPaused: boolean = false;
  @Input() muted: boolean = false;
  @Input() tempo: number = 100;
  @Input() isCountingDown: boolean = false;

  @Output() setProgression = new EventEmitter<'sequential' | 'random' | 'circleOfFifths'>();
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