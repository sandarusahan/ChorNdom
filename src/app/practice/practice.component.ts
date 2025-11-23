
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimatedLogoComponent } from '../animated-logo/animated-logo.component';
import { ChordDisplayComponent } from '../chord-display/chord-display.component';
import { ChordSelectorComponent } from '../chord-selector/chord-selector.component';
import { CircleOfFifthsComponent } from '../circle-of-fifths/circle-of-fifths.component';
import { ControlsComponent } from '../controls/controls.component';
import { TimeSignatureSelectorComponent } from '../time-signature-selector/time-signature-selector.component';
import { Voicing } from '../chord';
import { AudioService } from '../audio.service';
import { ChordService } from '../chord.service';
import { MetronomeService } from '../metronome.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DailyChallengeComponent } from '../dashboard/widgets/daily-challenge/daily-challenge.component';
import { SkillsTrackerComponent } from '../dashboard/widgets/skills-tracker/skills-tracker.component';
import { CommunityWidgetComponent } from '../dashboard/widgets/community-widget/community-widget.component';
import { TeacherWidgetComponent } from '../dashboard/widgets/teacher-widget/teacher-widget.component';
import { TunerWidgetComponent } from '../dashboard/widgets/tuner-widget/tuner-widget.component';
import { MetronomeWidgetComponent } from '../dashboard/widgets/metronome-widget/metronome-widget.component';

@Component({
  selector: 'app-practice',
  standalone: true,
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
  imports: [
    AnimatedLogoComponent,
    CommonModule,
    ChordDisplayComponent,
    ControlsComponent,
    ChordSelectorComponent,
    CircleOfFifthsComponent,
    TimeSignatureSelectorComponent,
    DragDropModule,
    RouterLink,
    DailyChallengeComponent,
    SkillsTrackerComponent,
    CommunityWidgetComponent,
    TeacherWidgetComponent,
    TunerWidgetComponent,
    MetronomeWidgetComponent
  ],
  animations: []
})
export class PracticeComponent implements OnInit, OnDestroy {
  private readonly LOADING_DURATION_MS = 1500;

  title = 'Practice On Strings';
  isLoading: boolean = true;
  nextChord = '...';
  chord = '';
  currentChordFingering: Voicing = { fingering: [] };

  beat = 4;
  denominator = 4;
  dot = -1;

  chords: string[];
  circleOfFifths: string[];
  selChords: string[] = [];
  started: Boolean = false;
  isPaused: Boolean = false;
  progressionMode: 'sequential' | 'random' | 'circleOfFifths' = 'sequential';
  editingTempo: boolean = false;
  muted: boolean = true;

  tempo = 100;

  // Countdown State
  isCountingDown = false;
  countdownValue = 3;

  private metronomeSubscription!: Subscription;
  private progressionIndex = 0;
  private familyJustSelected = false;

  // AI Chord Feedback
  isListening = false;
  feedbackChord = '';
  feedbackMessage = '';
  private feedbackSubscription!: Subscription;

  // Error handling
  audioError = '';

  constructor(
    private audioService: AudioService,
    private chordService: ChordService,
    private metronomeService: MetronomeService
  ) {
    this.chords = this.chordService.getAllChords();
    this.circleOfFifths = this.chordService.getChords('circleOfFifths');
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, this.LOADING_DURATION_MS);

    // Preload audio to prevent start delay
    this.audioService.loadSound('../assets/tones/Bass-Drum-2.wav').catch(err => {
      console.error('Failed to preload audio:', err);
    });
  }

  scrollToPractice() {
    const element = document.querySelector('.main-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  selCardOnClick(index: number) {
    this.selChords.splice(index + 1, 0, this.selChords[index]);
  }
  cardOnClick(chord: string) {
    this.selChords.push(chord);
  }

  removeChord(index: number) {
    this.selChords.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selChords, event.previousIndex, event.currentIndex);
  }

  editTempo() {
    this.editingTempo = true;
  }

  updateTempo(tempo: number) {
    this.tempo = tempo;
    if (this.tempo < 1) {
      this.tempo = 1;
    }
    if (this.tempo > 500) {
      this.tempo = 500;
    }
    this.editingTempo = false;
    if (this.started) {
      this.metronomeService.setTempo(this.tempo);
    }
  }

  changeBeat(beat: number) {
    this.beat = beat;
  }

  private getProgressionChords(): string[] {
    switch (this.progressionMode) {
      case 'sequential':
      case 'random':
        return this.selChords.length > 0 ? this.selChords : this.chords;
      case 'circleOfFifths':
        return this.selChords;
    }
  }

  async start() {
    if (!this.started && !this.isCountingDown) {
      this.isCountingDown = true;
      this.countdownValue = 3;

      // Start countdown
      const countdownInterval = setInterval(() => {
        this.countdownValue--;
        if (this.countdownValue <= 0) {
          clearInterval(countdownInterval);
          this.isCountingDown = false;
          this.beginPractice();
        }
      }, 1000);
    } else if (this.isPaused) {
      this.metronomeService.resume();
      this.isPaused = false;
    }
  }

  async beginPractice() {
    this.audioService.setMuted(this.muted);
    this.progressionIndex = 0;
    this.audioError = ''; // Clear any previous errors

    const initialProgressionChords = this.getProgressionChords();
    if (initialProgressionChords.length === 0) {
      return;
    }
    this.nextChord = initialProgressionChords[this.progressionIndex];

    this.metronomeService.setTempo(this.tempo);
    this.metronomeService.start();
    let beatCount = 0;
    this.metronomeSubscription = this.metronomeService.beat$.subscribe((beat) => {
      this.dot = beat.beat;
      beatCount++;

      if (!this.muted) {
        // Audio is played by the metronome service
      }

      if (beat.beat === 1) {
        this.chord = this.nextChord;
        const voicings = this.chordService.getChord(this.chord);
        if (voicings && voicings.length > 0) {
          this.currentChordFingering = voicings[0];
        }

        const progressionChords = this.getProgressionChords();

        if (progressionChords.length === 0) {
          this.stop();
          return;
        }

        if (this.progressionIndex >= progressionChords.length) {
          this.progressionIndex = 0;
        }

        if (this.progressionMode === 'random') {
          this.progressionIndex = Math.floor(Math.random() * progressionChords.length);
        } else {
          this.progressionIndex = (this.progressionIndex + 1) % progressionChords.length;
        }
        this.nextChord = progressionChords[this.progressionIndex];
      }
    });

    this.started = true;
  }

  setProgression(mode: 'sequential' | 'random' | 'circleOfFifths') {
    this.progressionMode = mode;
    if (this.started) {
      this.stop();
      this.start();
    }
  }

  randomize() {
    if (this.progressionMode !== 'random') {
      this.setProgression('random');
    } else {
      this.setProgression('sequential');
    }
  }

  onSelectChordType(type: string) {
    this.selChords = this.chordService.getChords(type);
  }

  onFamilyChordsSelected(chords: string[]) {
    this.selChords = chords;
    this.familyJustSelected = true;
  }

  onCircleChordSelected(chord: string) {
    if (this.familyJustSelected) {
      this.selChords = [chord];
      this.familyJustSelected = false;
    } else {
      this.selChords.push(chord);
    }
  }
  onTimeSignatureChange({ numerator, denominator }: { numerator: number, denominator: number }) {
    this.metronomeService.setTimeSignature(numerator, denominator);
    this.beat = numerator;
    this.denominator = denominator;
  }

  all() {
    this.selChords = this.chordService.getAllChords().slice();
  }

  clearAll() {
    this.selChords = [];
  }
  stop() {
    this.metronomeService.stop();
    if (this.metronomeSubscription) {
      this.metronomeSubscription.unsubscribe();
    }
    this.progressionIndex = 0;
    this.started = false;
    this.isPaused = false;
    this.dot = -1;
    this.isCountingDown = false;
    this.countdownValue = 3;
    this.chord = ''; // Clear default text
    this.nextChord = '...';
    this.currentChordFingering = { fingering: [] };
  }

  pause() {
    if (this.started && !this.isPaused) {
      this.metronomeService.pause();
      this.isPaused = true;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    this.audioService.setMuted(this.muted);
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  private startListening() {
    this.isListening = true;
    this.feedbackMessage = 'Listening...';
    this.feedbackSubscription = this.audioService.startListening().subscribe(chord => {
      this.feedbackChord = chord;
      if (chord === this.chord) {
        this.feedbackMessage = 'Correct! Great job!';
      } else {
        this.feedbackMessage = `Heard ${chord}, try again!`;
      }
    });
  }

  private stopListening() {
    this.isListening = false;
    this.feedbackMessage = '';
    this.feedbackChord = '';
    this.audioService.stopListening();
    if (this.feedbackSubscription) {
      this.feedbackSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.stopListening();
    if (this.metronomeSubscription) {
      this.metronomeSubscription.unsubscribe();
    }
  }
}

