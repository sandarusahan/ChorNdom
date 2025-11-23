import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
      'Limited lessons',
      'Community access'
    ]
  };

  proPlan = {
    name: 'Pro',
    price: 9.99,
    features: [
      'Unlimited chord practice',
      'All lessons & courses',
      'AI Chord Feedback',
      '1-on-1 Mentorship',
      'Priority support'
    ]
  };

  isProcessing = false;

  upgradeToPro() {
    this.isProcessing = true;
    // Simulate Stripe payment
    setTimeout(() => {
      this.isProcessing = false;
      alert('Upgrade successful! (Mock)');
    }, 1500);
  }
}
