import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-feedback',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="feedback-container">
      <h2>We value your feedback</h2>
      <p>Help us improve Practice On Strings. Tell us what you like, what's missing, or report a bug.</p>
      
      <form (ngSubmit)="onSubmit()" #feedbackForm="ngForm">
        <div class="form-group">
          <label for="email">Email (optional)</label>
          <input type="email" id="email" name="email" [(ngModel)]="email" placeholder="your@email.com">
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" [(ngModel)]="message" required rows="5" placeholder="Your feedback here..."></textarea>
        </div>
        
        <button type="submit" class="btn-submit" [disabled]="!message">Submit Feedback</button>
      </form>

      <div *ngIf="submitted" class="success-message">
        Thank you for your feedback!
      </div>
    </div>
  `,
    styles: [`
    .feedback-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: var(--card-bg, #1e1e1e);
      border-radius: 12px;
      color: var(--text-color, #fff);
    }
    h2 { margin-bottom: 1rem; }
    p { margin-bottom: 2rem; color: #aaa; }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid #444;
      background: #2a2a2a;
      color: #fff;
      font-family: inherit;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color, #007bff);
    }
    .btn-submit {
      background: var(--primary-color, #007bff);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    .btn-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .success-message {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba(40, 167, 69, 0.2);
      color: #28a745;
      border-radius: 6px;
      text-align: center;
    }
  `]
})
export class FeedbackComponent {
    email = '';
    message = '';
    submitted = false;

    onSubmit() {
        if (!this.message) return;

        console.log('Feedback submitted:', { email: this.email, message: this.message });
        // TODO: Send to backend

        this.submitted = true;
        setTimeout(() => {
            this.submitted = false;
            this.message = '';
            this.email = '';
        }, 3000);
    }
}
