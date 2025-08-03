import { Component, Input } from '@angular/core';
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
}