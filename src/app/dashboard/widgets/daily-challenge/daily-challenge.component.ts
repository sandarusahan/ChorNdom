import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-daily-challenge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './daily-challenge.component.html',
    styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent {
    currentProgression = ['G', 'C', 'Em', 'D'];

    constructor(private router: Router) { }

    viewChallenges() {
        this.router.navigate(['/app/challenges']);
    }
}
