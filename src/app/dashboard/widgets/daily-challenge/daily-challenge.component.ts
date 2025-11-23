import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-daily-challenge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './daily-challenge.component.html',
    styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent {
    isActive = false;
    isCompleted = false;
    timeLeft = 60;
    timerId: any;
    currentProgression = ['G', 'C', 'Em', 'D'];

    startChallenge() {
        this.isActive = true;
        this.isCompleted = false;
        this.timeLeft = 60;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.completeChallenge(false);
            }
        }, 1000);
    }

    completeChallenge(success: boolean = true) {
        this.isActive = false;
        this.isCompleted = success;
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }
}
