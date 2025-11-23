import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  settings = {
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    notifications: true,
    emailUpdates: false,
    autoplay: true
  };

  isSaving = false;

  onSave() {
    this.isSaving = true;
    // Simulate API call
    setTimeout(() => {
      this.isSaving = false;
      alert('Settings saved! (Mock)');
    }, 1000);
  }
}
