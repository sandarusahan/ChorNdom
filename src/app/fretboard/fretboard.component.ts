import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Voicing } from '../chord';

@Component({
  selector: 'app-fretboard',
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.css']
})
export class FretboardComponent implements OnChanges {
  @Input() voicing: Voicing = { fingering: [] };
  frets: number[] = [1, 2, 3, 4, 5, 6];
  strings = Array(6).fill(0).map((x, i) => i);
  public showNut = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.voicing && this.voicing) {
      this.updateFretRange();
    }
  }

  private updateFretRange(): void {
    const frettedNotes = this.voicing.fingering
      .map(f => (typeof f === 'number' ? f : -1))
      .filter(f => f > 0);

    if (frettedNotes.length === 0) {
      this.frets = [1, 2, 3, 4, 5, 6];
    } else {
      const minFret = Math.min(...frettedNotes);
      const maxFret = Math.max(...frettedNotes);

      if (maxFret < 7) {
        this.frets = [1, 2, 3, 4, 5, 6];
      } else {
        const windowStart = minFret;
        let windowEnd = maxFret;
        if (windowEnd - windowStart < 5) {
          windowEnd = windowStart + 5;
        }

        this.frets = [];
        for (let i = windowStart; i <= windowEnd; i++) {
          this.frets.push(i);
        }
      }
    }
    this.showNut = this.frets[0] === 1;
  }

  isFretted(string: number, fret: number): boolean {
    return this.voicing.fingering[string] === fret;
  }

  isBarre(fret: number, string: number): boolean {
    if (!this.voicing.barre) {
      return false;
    }
    return this.voicing.barre.fret === fret && string >= this.voicing.barre.startString && string <= this.voicing.barre.endString;
  }

  getStringThickness(string: number): string {
    const minThickness = 1;
    const maxThickness = 3;
    const thickness =
      minThickness + (maxThickness - minThickness) * ((5 - string) / 5);
    return `${thickness}px`;
  }
}
