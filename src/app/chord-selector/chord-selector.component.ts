import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chord-selector',
  templateUrl: './chord-selector.component.html',
  styleUrls: ['./chord-selector.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChordSelectorComponent {
  @Input() chords: string[];
  @Input() selChords: string[];

  @Output() selectChord = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() selectChordType = new EventEmitter<string>();
}