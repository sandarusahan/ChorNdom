import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  public audioContext: AudioContext;
  private audioBuffer: AudioBuffer | null = null;
  private loaded = false;
  private gainNode: GainNode;
  private isMuted = true;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  public async loadSound(url: string): Promise<void> {
    if (this.loaded && this.audioBuffer) {
      return;
    }
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.loaded = true;
    } catch (e) {
      console.error('Error loading sound', e);
    }
  }

  public playSoundAt(time: number) {
    if (!this.loaded || !this.audioBuffer) {
      return;
    }
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.gainNode);
    source.start(time);
  }

  public setMuted(isMuted: boolean) {
    this.gainNode.gain.value = isMuted ? 0 : 1;
  }

  public get currentTime(): number {
    return this.audioContext.currentTime;
  }
}