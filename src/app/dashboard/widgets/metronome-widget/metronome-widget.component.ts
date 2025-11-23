import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetronomeService } from '../../../metronome.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metronome-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metronome-widget.component.html',
  styleUrls: ['./metronome-widget.component.css']
})
export class MetronomeWidgetComponent implements OnInit, OnDestroy {
  tempo = 100;
  isPlaying = false;
  beat = 1;
  timeSignature = '4/4';
  beatsPerMeasure = 4;
  beatsArray = [1, 2, 3, 4];
  private subscription!: Subscription;

  constructor(private metronomeService: MetronomeService) { }

  ngOnInit() {
    this.subscription = this.metronomeService.beat$.subscribe(beat => {
      this.beat = beat.beat;
    });
  }

  toggleMetronome() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.metronomeService.setTempo(this.tempo);
      this.metronomeService.start();
    } else {
      this.metronomeService.stop();
    }
  }

  updateTempo() {
    if (this.isPlaying) {
      this.metronomeService.setTempo(this.tempo);
    }
  }

  setTimeSignature(ts: string) {
    this.timeSignature = ts;
    const [num, den] = ts.split('/').map(Number);
    this.beatsPerMeasure = num;
    this.beatsArray = Array(num).fill(0).map((x, i) => i + 1);
    this.metronomeService.setTimeSignature(num, den);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.metronomeService.stop();
  }
}
