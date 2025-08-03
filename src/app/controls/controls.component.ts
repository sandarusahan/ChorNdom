import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {
  @Input() started: boolean;
  @Input() muted: boolean;
  @Input() tempo: number;
  @Input() beat: number;
  @Input() progressionMode: 'sequential' | 'random' | 'circleOfFifths';

  @Output() start = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Output() toggleMute = new EventEmitter<void>();
  @Output() updateTempo = new EventEmitter<number>();
  @Output() changeBeat = new EventEmitter<number>();
  @Output() setProgression = new EventEmitter<'sequential' | 'random' | 'circleOfFifths'>();

  editingTempo = false;

  editTempo() {
    this.editingTempo = true;
  }

  onUpdateTempo() {
    this.editingTempo = false;
    this.updateTempo.emit(this.tempo);
  }
}