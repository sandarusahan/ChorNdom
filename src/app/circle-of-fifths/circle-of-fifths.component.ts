import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChordService } from '../chord.service';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrls: ['./circle-of-fifths.component.css']
})
export class CircleOfFifthsComponent implements OnInit {
  @Output() chordSelected = new EventEmitter<string>();
  @Output() familyChordsSelected = new EventEmitter<string[]>();
  keys: string[];
  selectedKey: string;
  familyChords: string[];
  scale: 'major' | 'minor' = 'major';

  constructor(private chordService: ChordService) { }

  ngOnInit() {
    this.keys = this.chordService.getChords('circleOfFifths');
    this.selectKey(this.keys[0]);
  }

  getTransform(index: number): string {
    const angle = (index / this.keys.length) * 360;
    return `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`;
  }

  selectKey(key: string) {
    this.selectedKey = key;
    this.familyChords = this.chordService.getFamilyChords(key, this.scale);
    this.familyChordsSelected.emit(this.familyChords);
  }

  toggleScale() {
    this.scale = this.scale === 'major' ? 'minor' : 'major';
    this.selectKey(this.selectedKey);
  }
}
