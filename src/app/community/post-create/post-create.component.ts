import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  content = '';
  isSubmitting = false;

  constructor(private router: Router) { }

  onSubmit() {
    if (!this.content.trim()) return;

    this.isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/app/community']);
    }, 1000);
  }
}
