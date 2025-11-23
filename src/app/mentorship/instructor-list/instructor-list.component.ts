import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Instructor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  rate: number;
  availability: string;
}

@Component({
  selector: 'app-instructor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent {
  instructors: Instructor[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      specialty: 'Classical & Fingerstyle',
      rating: 4.9,
      rate: 50,
      availability: 'Available Today'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?u=mike',
      specialty: 'Rock & Metal',
      rating: 4.8,
      rate: 45,
      availability: 'Available Tomorrow'
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?u=emily',
      specialty: 'Jazz & Blues',
      rating: 5.0,
      rate: 60,
      availability: 'Next Week'
    }
  ];
}
