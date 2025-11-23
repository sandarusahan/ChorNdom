import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PracticeComponent } from './practice/practice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
  {
    path: 'app',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PracticeComponent },
      { path: 'lessons', loadComponent: () => import('./lessons/lesson-list/lesson-list.component').then(m => m.LessonListComponent) },
      { path: 'lessons/:id', loadComponent: () => import('./lessons/lesson-detail/lesson-detail.component').then(m => m.LessonDetailComponent) },
      { path: 'community', loadComponent: () => import('./community/feed/feed.component').then(m => m.FeedComponent) },
      { path: 'community/profile/:id', loadComponent: () => import('./community/user-profile/user-profile.component').then(m => m.UserProfileComponent) },
      { path: 'mentorship', loadComponent: () => import('./mentorship/instructor-list/instructor-list.component').then(m => m.InstructorListComponent) },
      { path: 'mentorship/book/:id', loadComponent: () => import('./mentorship/booking/booking.component').then(m => m.BookingComponent) },
      { path: 'mentorship/call/:id', loadComponent: () => import('./mentorship/video-call/video-call.component').then(m => m.VideoCallComponent) },
      { path: 'profile/settings', loadComponent: () => import('./profile/settings/settings.component').then(m => m.SettingsComponent) },
      { path: 'profile/subscription', loadComponent: () => import('./profile/subscription/subscription.component').then(m => m.SubscriptionComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];

