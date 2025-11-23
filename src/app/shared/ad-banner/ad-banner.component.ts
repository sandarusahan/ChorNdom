import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="ad-container" *ngIf="shouldShowAd">
      <div class="ad-content">
        <span class="ad-label">Advertisement</span>
        <div class="ad-placeholder">
          <h3>Guitar Gear Sale!</h3>
          <p>Get 20% off all strings and picks.</p>
          <button class="btn-ad">Shop Now</button>
        </div>
        <div class="remove-ads">
          <a routerLink="/app/profile/subscription">Remove Ads for £0.99</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ad-container {
      width: 100%;
      padding: 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: center;
    }
    .ad-content {
      max-width: 728px;
      width: 100%;
      background: white;
      border: 1px solid #ddd;
      padding: 1rem;
      position: relative;
      text-align: center;
    }
    .ad-label {
      position: absolute;
      top: 0;
      right: 0;
      background: #eee;
      color: #666;
      font-size: 0.7rem;
      padding: 2px 6px;
    }
    .ad-placeholder h3 { margin: 0 0 0.5rem; color: #333; }
    .ad-placeholder p { margin: 0 0 1rem; color: #666; }
    .btn-ad {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .remove-ads {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
    .remove-ads a {
      color: #999;
      text-decoration: none;
    }
    .remove-ads a:hover { text-decoration: underline; }
  `]
})
export class AdBannerComponent implements OnInit, OnDestroy {
  shouldShowAd = false;
  private userSub?: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      // Show ad if user is not logged in OR user is not pro
      this.shouldShowAd = !user || !user.isPro;
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
