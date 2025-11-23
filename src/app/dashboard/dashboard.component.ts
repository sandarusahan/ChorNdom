import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, RouterModule],
    standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
    user: User | null = null;
    private userSubscription?: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userSubscription = this.authService.user$.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe();
    }

    onNotificationsClick(): void {
        // TODO: Implement notifications feature
        console.log('Notifications clicked - feature coming soon');
    }
}
