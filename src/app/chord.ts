export interface Voicing {
  fingering: (number | null | 'x')[];
  barre?: {
    fret: number;
    startString: number;
    endString: number;
  };
}

export interface Chord {
  [key: string]: Voicing[];
}