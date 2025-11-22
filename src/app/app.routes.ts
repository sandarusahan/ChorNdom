import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PracticeComponent } from './practice/practice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'app',
    component: DashboardComponent,
    children: [
      { path: '', component: PracticeComponent },
      { path: 'lessons', component: PracticeComponent }, // Placeholder
      { path: 'community', component: PracticeComponent }, // Placeholder
      { path: 'mentorship', component: PracticeComponent } // Placeholder
    ]
  },
  { path: '**', redirectTo: '' }
];

