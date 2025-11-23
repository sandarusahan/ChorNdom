import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skills-tracker',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills-tracker.component.html',
    styleUrls: ['./skills-tracker.component.css']
})
export class SkillsTrackerComponent {
    skills = {
        chords: 70,
        rhythm: 45,
        theory: 60,
        ear: 30
    };

    getPoints(): string {
        const center = 50;
        const radius = 40;
        const categories = Object.keys(this.skills);
        const angleStep = (Math.PI * 2) / categories.length;

        return categories.map((key, index) => {
            const value = (this.skills as any)[key];
            const angle = index * angleStep - Math.PI / 2; // Start at top
            const r = (value / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    }
}
