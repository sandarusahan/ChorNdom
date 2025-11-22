import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LandingPageComponent {
  features = [
    {
      title: 'Interactive Practice Studio',
      body: 'Visualize finger positions, get real-time AI feedback',
      icon: 'mic_external_on' // Using Material Icons name
    },
    {
      title: 'Vibrant Community',
      body: 'Ask questions, share progress, connect to other guitarists',
      icon: 'forum'
    },
    {
      title: '1-on-1 Mentorship',
      body: 'Book a 30-min session with certified instructor',
      icon: 'school'
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
        'Limited Chord Library',
        'First 7 Lessons',
        'Unlimited Lessons',
        'AI Feedback Tests',
        'Full Community Access',
        'Full Connections',
        'Practice Stats'
      ],
      highlight: false,
      buttonText: 'Start Free Trial' // Or just Sign Up
    },
    {
      name: 'Pro',
      price: '$19',
      cadence: '/month',
      features: [], // The design doesn't list features here, just price
      highlight: true,
      buttonText: 'Start Pro Trial'
    },
    {
      name: '1-on-1 Session',
      price: '$20',
      cadence: '/session',
      features: ['Book 30-min live video call with instructor'],
      highlight: false,
      buttonText: 'Browse Instructors'
    },
  ];

  testimonials = [
    {
      quote: 'Practice On Strings made learning guitar fun! The AI feedback is a game changer.',
      name: 'Sarah L.',
      role: '',
      image: 'assets/avatar1.jpg' // Placeholder
    },
    {
      quote: 'Finally an app that actually helps you improve. The community is super supportive.',
      name: 'Mark T.',
      role: '',
      image: 'assets/avatar2.jpg' // Placeholder
    }
  ];
}