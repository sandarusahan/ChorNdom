import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService.signup(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/app']);
      },
      error: (err) => {
        this.error = 'Signup failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
