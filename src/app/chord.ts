export interface Voicing {
  fingering: (number | null)[];
  barre?: {
    fret: number;
    startString: number;
    endString: number;
  };
}

export interface Chord {
  [key: string]: Voicing[];
}