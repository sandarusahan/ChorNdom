import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  user = {
    name: 'GuitarHero99',
    avatar: 'https://i.pravatar.cc/150?u=1',
    bio: 'Passionate about rock and blues. Learning guitar for 2 years.',
    joined: 'January 2023',
    posts: 12,
    followers: 45,
    following: 30
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    // Mock fetch user by ID
  }
}
