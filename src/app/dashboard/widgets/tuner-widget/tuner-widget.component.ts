import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../../audio.service';

@Component({
  selector: 'app-tuner-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tuner-widget.component.html',
  styleUrls: ['./tuner-widget.component.css']
})
export class TunerWidgetComponent implements OnInit, OnDestroy {
  note = '--';
  cents = 0;
  isActive = false;
  private requestAnimationFrameId: number | null = null;
  private readonly noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  constructor(
    private audioService: AudioService,
    private cdr: ChangeDetectorRef
  ) { }

  async toggleTuner() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      try {
        await this.audioService.startMicrophone();
        this.updatePitch();
      } catch (err) {
        console.error('Failed to start tuner', err);
        this.isActive = false;
      }
    } else {
      this.stopTuner();
    }
  }

  private updatePitch() {
    if (!this.isActive) return;

    const frequency = this.audioService.getPitch();
    if (frequency > 0) {
      const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
      const midi = Math.round(noteNum) + 69;
      const noteIndex = midi % 12;
      this.note = this.noteStrings[noteIndex];

      const detune = Math.floor((noteNum - Math.round(noteNum)) * 100);
      this.cents = detune;
    } else {
      // Keep last note or show -- if silence for too long? 
      // For now just keep last note but maybe reset cents?
    }

    this.cdr.detectChanges();
    this.requestAnimationFrameId = requestAnimationFrame(() => this.updatePitch());
  }

  private stopTuner() {
    this.audioService.stopMicrophone();
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
    }
    this.note = '--';
    this.cents = 0;
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.stopTuner();
  }
}
