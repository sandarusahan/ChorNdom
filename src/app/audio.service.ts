import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer;

  constructor() {
    this.audioContext = new AudioContext();
    this.loadSound('../assets/tones/Bass-Drum-2.wav');
  }

  private async loadSound(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  playSound() {
    if (this.audioBuffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();
    }
  }
}