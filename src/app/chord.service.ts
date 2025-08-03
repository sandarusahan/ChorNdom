import { Injectable } from '@angular/core';
import { Chord, Voicing } from './chord';

@Injectable({
  providedIn: 'root'
})
export class ChordService {
  private chordFingeringMap: Chord = {
    'C': [{ fingering: [null, 3, 2, 0, 1, 0] }, { fingering: [8, 10, 10, 9, 8, 8], barre: { fret: 8, startString: 0, endString: 5 } }],
    'D': [{ fingering: [null, null, 0, 2, 3, 2] }, { fingering: [10, 12, 12, 11, 10, 10], barre: { fret: 10, startString: 0, endString: 5 } }],
    'E': [{ fingering: [0, 2, 2, 1, 0, 0] }],
    'F': [{ fingering: [1, 3, 3, 2, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'G': [{ fingering: [3, 2, 0, 0, 0, 3] }, { fingering: [3, 5, 5, 4, 3, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'A': [{ fingering: [null, 0, 2, 2, 2, 0] }, { fingering: [5, 7, 7, 6, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'B': [{ fingering: [null, 2, 4, 4, 4, 2], barre: { fret: 2, startString: 0, endString: 5 } }, { fingering: [7, 9, 9, 8, 7, 7], barre: { fret: 7, startString: 0, endString: 5 } }],
    'C#': [{ fingering: [null, 4, 6, 6, 6, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Eb': [{ fingering: [null, 6, 8, 8, 8, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'F#': [{ fingering: [2, 4, 4, 3, 2, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'Ab': [{ fingering: [4, 6, 6, 5, 4, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Bb': [{ fingering: [null, 1, 3, 3, 3, 1], barre: { fret: 1, startString: 0, endString: 5 } }, { fingering: [6, 8, 8, 7, 6, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'Cm': [{ fingering: [null, 3, 5, 5, 4, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'Dm': [{ fingering: [null, null, 0, 2, 3, 1] }, { fingering: [5, 7, 7, 6, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'Em': [{ fingering: [0, 2, 2, 0, 0, 0] }],
    'Fm': [{ fingering: [1, 3, 3, 1, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'Gm': [{ fingering: [3, 5, 5, 3, 3, 3], barre: { fret: 3, startString: 0, endString: 5 } }],
    'Am': [{ fingering: [null, 0, 2, 2, 1, 0] }, { fingering: [5, 7, 7, 5, 5, 5], barre: { fret: 5, startString: 0, endString: 5 } }],
    'Bm': [{ fingering: [null, 2, 4, 4, 3, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'C#m': [{ fingering: [null, 4, 6, 6, 5, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Ebm': [{ fingering: [null, 6, 8, 8, 7, 6], barre: { fret: 6, startString: 0, endString: 5 } }],
    'F#m': [{ fingering: [2, 4, 4, 2, 2, 2], barre: { fret: 2, startString: 0, endString: 5 } }],
    'Abm': [{ fingering: [4, 6, 6, 4, 4, 4], barre: { fret: 4, startString: 0, endString: 5 } }],
    'Bbm': [{ fingering: [null, 1, 3, 3, 2, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'C7': [{ fingering: [null, 3, 2, 3, 1, 0] }],
    'D7': [{ fingering: [null, null, 0, 2, 1, 2] }],
    'E7': [{ fingering: [0, 2, 0, 1, 0, 0] }],
    'F7': [{ fingering: [1, 3, 1, 2, 1, 1], barre: { fret: 1, startString: 0, endString: 5 } }],
    'G7': [{ fingering: [3, 2, 0, 0, 0, 1] }],
    'A7': [{ fingering: [null, 0, 2, 0, 2, 0] }],
    'B7': [{ fingering: [null, 2, 1, 2, 0, 2] }],
    'Asus2': [{ fingering: [null, 0, 2, 2, 0, 0] }],
    'Asus4': [{ fingering: [null, 0, 2, 2, 3, 0] }],
    'Dsus2': [{ fingering: [null, null, 0, 2, 3, 0] }],
    'Dsus4': [{ fingering: [null, null, 0, 2, 3, 3] }],
    'Esus4': [{ fingering: [0, 2, 2, 2, 0, 0] }]
  };

  private majorChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C#', 'Eb', 'F#', 'Ab', 'Bb'];
  private minorChords = ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', 'C#m', 'Ebm', 'F#m', 'Abm', 'Bbm'];
  private seventhChords = ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'];
  private suspendedChords = ['Asus2', 'Asus4', 'Dsus2', 'Dsus4', 'Esus4'];
  private circleOfFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];

  constructor() { }

  getChord(chordName: string): Voicing[] {
    return this.chordFingeringMap[chordName];
  }

  getChords(type: string): string[] {
    switch (type) {
      case 'major':
        return this.majorChords;
      case 'minor':
        return this.minorChords;
      case 'seventh':
        return this.seventhChords;
      case 'suspended':
        return this.suspendedChords;
      case 'circleOfFifths':
        return this.circleOfFifths;
      default:
        return this.getAllChords();
    }
  }

  getAllChords(): string[] {
    return this.majorChords.concat(this.minorChords, this.seventhChords, this.suspendedChords);
  }
}