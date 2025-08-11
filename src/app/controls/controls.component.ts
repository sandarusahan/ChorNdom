import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent {
  @Input() beat: number;
  @Input() progressionMode: 'sequential' | 'random' | 'circleOfFifths';

  @Output() setProgression = new EventEmitter<'sequential' | 'random' | 'circleOfFifths'>();
}