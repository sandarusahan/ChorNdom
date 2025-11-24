import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LandingPageComponent implements OnInit, OnDestroy {
  @ViewChild('vantaRef', { static: true }) vantaRef: ElementRef;
  private vantaEffect: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.vantaEffect = HALO({
      el: this.vantaRef.nativeElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      baseColor: 0x11998e, // Primary Teal
      backgroundColor: 0x0f1115, // Dark Background
      amplitudeFactor: 1.00, // More subtle movement
      xOffset: 0.45,
      yOffset: 0.05,
      size: 1.20, // Smaller size
      THREE: THREE
    });
  }

  ngOnDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  features = [
    {
      title: 'Interactive Practice Studio',
      body: 'Visualize finger positions and practice chord changes',
      icon: 'music_note'
    },
    {
      title: 'Daily Challenges',
      body: 'Master common chord progressions with curated challenges',
      icon: 'emoji_events'
    },
    {
      title: 'Vibrant Community',
      body: 'Ask questions, share progress, connect to other guitarists',
      icon: 'forum'
    },
  ];

  plans = [
    {
      name: 'Free',
      price: 'Free',
      cadence: '',
      features: [
        'Basic Tuner',
        'Metronome',
        'Chord Library',
        'Daily Challenges',
        'Practice Stats',
        'Ad-supported'
      ],
      highlight: false,
      buttonText: 'Start Practicing'
    },
    {
      name: 'Premium',
      price: '£0.99',
      cadence: 'one-time',
      features: [
        'Remove Ads',
        'Support Development',
        'All Free Features'
      ],
      highlight: true,
      buttonText: 'Go Premium'
    }
  ];

  testimonials = [
    {
      quote: 'Practice On Strings made learning guitar fun! The daily challenges keep me motivated.',
      name: 'Sarah L.',
      role: '',
      image: 'assets/avatar1.jpg'
    },
    {
      quote: 'Finally an app that actually helps you improve. The community is super supportive.',
      name: 'Mark T.',
      role: '',
      image: 'assets/avatar2.jpg'
    }
  ];

  onPlanSelect(planName: string): void {
    switch (planName) {
      case 'Free':
        this.router.navigate(['/app']);
        break;
      case 'Premium':
        this.router.navigate(['/signup'], { queryParams: { plan: 'premium' } });
        break;
    }
  }
}