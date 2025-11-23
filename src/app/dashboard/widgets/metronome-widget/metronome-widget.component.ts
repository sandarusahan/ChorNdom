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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.metronomeService.stop();
  }
}
