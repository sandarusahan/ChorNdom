import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public async initAudio() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public synthesizeClick(time: number) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.frequency.value = 1000;
    osc.type = 'square';

    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  // Tuner Functionality
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private bufferLength = 2048;
  private dataArray = new Float32Array(this.bufferLength);

  public async startMicrophone(): Promise<void> {
    await this.initAudio();
    if (this.microphoneStream) return;

    try {
      this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      source.connect(this.analyser);
    } catch (err) {
      console.error('Error accessing microphone', err);
      throw err;
    }
  }

  public stopMicrophone() {
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
      this.microphoneStream = null;
    }
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
  }

  public getPitch(): number {
    if (!this.analyser) return -1;

    this.analyser.getFloatTimeDomainData(this.dataArray);
    return this.autoCorrelate(this.dataArray, this.audioContext.sampleRate);
  }

  private autoCorrelate(buf: Float32Array, sampleRate: number): number {
    // Implements the ACF2+ algorithm
    let size = buf.length;
    let rms = 0;

    for (let i = 0; i < size; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / size);

    if (rms < 0.01) // not enough signal
      return -1;

    let r1 = 0, r2 = size - 1, thres = 0.2;
    for (let i = 0; i < size / 2; i++)
      if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < size / 2; i++)
      if (Math.abs(buf[size - i]) < thres) { r2 = size - i; break; }

    buf = buf.slice(r1, r2);
    size = buf.length;

    const c = new Array(size).fill(0);
    for (let i = 0; i < size; i++)
      for (let j = 0; j < size - i; j++)
        c[i] = c[i] + buf[j] * buf[j + i];

    let d = 0; while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < size; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  // Mock AI Chord Feedback
  private listening = false;

  public startListening(): Observable<string> {
    this.listening = true;
    // Simulate recognizing a chord every 3 seconds
    return new Observable<string>(observer => {
      const interval = setInterval(() => {
        if (!this.listening) {
          clearInterval(interval);
          return;
        }
        const chords = ['C', 'G', 'D', 'A', 'E', 'Am', 'Em', 'Dm'];
        const randomChord = chords[Math.floor(Math.random() * chords.length)];
        observer.next(randomChord);
      }, 3000);

      return () => {
        this.listening = false;
        clearInterval(interval);
      };
    });
  }

  public stopListening() {
    this.listening = false;
  }
}