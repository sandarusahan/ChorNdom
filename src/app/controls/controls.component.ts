import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ControlsComponent {
  @Input() beat: number;
  @Input() progressionMode: 'sequential' | 'random' | 'circleOfFifths';

  @Output() setProgression = new EventEmitter<'sequential' | 'random' | 'circleOfFifths'>();
}