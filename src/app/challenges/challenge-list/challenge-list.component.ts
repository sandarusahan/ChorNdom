import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    chords: string[];
}

@Component({
    selector: 'app-challenge-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="challenges-container">
      <header class="header">
        <h1>Daily Challenges</h1>
        <p>Master these common progressions to improve your skills.</p>
      </header>

      <div class="challenge-grid">
        <div class="challenge-card" *ngFor="let challenge of challenges" (click)="startChallenge(challenge)">
          <div class="card-header">
            <h3>{{ challenge.title }}</h3>
            <span class="badge" [ngClass]="challenge.difficulty.toLowerCase()">{{ challenge.difficulty }}</span>
          </div>
          <p class="description">{{ challenge.description }}</p>
          <div class="chords-preview">
            <span class="chord-pill" *ngFor="let chord of challenge.chords">{{ chord }}</span>
          </div>
          <button class="btn-start">Start Practice</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .challenges-container {
      padding: 2rem;
      color: var(--text-color, #fff);
    }
    .header { margin-bottom: 2rem; }
    .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .header p { color: #aaa; }
    
    .challenge-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .challenge-card {
      background: var(--card-bg, #1e1e1e);
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid transparent;
    }
    .challenge-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border-color: var(--primary-color, #007bff);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .card-header h3 { margin: 0; font-size: 1.25rem; }
    
    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .badge.beginner { background: rgba(40, 167, 69, 0.2); color: #28a745; }
    .badge.intermediate { background: rgba(255, 193, 7, 0.2); color: #ffc107; }
    .badge.advanced { background: rgba(220, 53, 69, 0.2); color: #dc3545; }
    
    .description { color: #ccc; margin-bottom: 1.5rem; font-size: 0.95rem; }
    
    .chords-preview {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .chord-pill {
      background: #333;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-family: monospace;
      font-weight: bold;
    }
    
    .btn-start {
      width: 100%;
      padding: 0.75rem;
      background: var(--primary-color, #007bff);
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class ChallengeListComponent {
    challenges: Challenge[] = [
        {
            id: 'pop-1',
            title: 'Pop Progression 1',
            description: 'The classic I-V-vi-IV progression used in thousands of songs.',
            difficulty: 'Beginner',
            chords: ['C', 'G', 'Am', 'F']
        },
        {
            id: 'jazz-ii-v-i',
            title: 'Jazz ii-V-I',
            description: 'The most important progression in jazz.',
            difficulty: 'Intermediate',
            chords: ['Dm7', 'G7', 'Cmaj7']
        },
        {
            id: 'blues-12-bar',
            title: '12-Bar Blues',
            description: 'Standard 12-bar blues in E.',
            difficulty: 'Beginner',
            chords: ['E7', 'A7', 'B7']
        },
        {
            id: 'canon',
            title: 'Canon in D',
            description: 'Pachelbel\'s Canon progression.',
            difficulty: 'Intermediate',
            chords: ['D', 'A', 'Bm', 'F#m', 'G', 'D', 'G', 'A']
        }
    ];

    constructor(private router: Router) { }

    startChallenge(challenge: Challenge) {
        // Navigate to practice with chords in query params or state
        this.router.navigate(['/app'], {
            queryParams: {
                chords: challenge.chords.join(','),
                mode: 'sequential'
            }
        });
    }
}
