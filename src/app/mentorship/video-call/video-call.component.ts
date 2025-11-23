import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
  isMuted = false;
  isVideoOff = false;
  callDuration = 0;
  private timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.callDuration++;
    }, 1000);
  }

  get formattedDuration(): string {
    const minutes = Math.floor(this.callDuration / 60);
    const seconds = this.callDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
