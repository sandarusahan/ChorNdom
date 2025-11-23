import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  instructorId: string | null = null;
  selectedDate = '';
  selectedTime = '';
  isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.instructorId = this.route.snapshot.paramMap.get('id');
  }

  onBook() {
    if (!this.selectedDate || !this.selectedTime) return;

    this.isProcessing = true;
    // Simulate Stripe payment and booking process
    setTimeout(() => {
      this.isProcessing = false;
      alert('Booking Confirmed! (Mock)');
      this.router.navigate(['/app/mentorship']);
    }, 1500);
  }
}
