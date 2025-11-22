import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    navItems = [
        { label: 'Home', icon: 'home', route: '/app' },
        { label: 'Lessons', icon: 'school', route: '/app/lessons' },
        { label: 'Community', icon: 'forum', route: '/app/community' },
        { label: '1v1 Mentorship', icon: 'person', route: '/app/mentorship' }
    ];
}
