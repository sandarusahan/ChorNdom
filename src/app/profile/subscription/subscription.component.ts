import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  currentPlan = {
    name: 'Free',
    price: 0,
    features: [
      'Basic chord practice',
      'Daily Challenges',
      'Community access',
      'Ad-supported'
    ]
  };

  premiumPlan = {
    name: 'Premium',
    price: 0.99,
    features: [
      'Remove Ads',
      'Support Development',
      'All Free Features'
    ]
  };

  isProcessing = false;

  constructor(private authService: AuthService) { }

  buyPremium() {
    this.isProcessing = true;
    // Simulate payment
    this.authService.upgradeToPremium().subscribe({
      next: () => {
        this.isProcessing = false;
        alert('Thank you for going Premium!');
      },
      error: (err) => {
        this.isProcessing = false;
        console.error(err);
        alert('Something went wrong.');
      }
    });
  }
}
