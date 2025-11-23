import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  posts: Post[] = [
    {
      id: '1',
      author: 'GuitarHero99',
      authorAvatar: 'https://i.pravatar.cc/150?u=1',
      content: 'Just mastered the F chord! My fingers hurt but it is worth it. #guitar #progress',
      likes: 24,
      comments: 5,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: 'AcousticSoul',
      authorAvatar: 'https://i.pravatar.cc/150?u=2',
      content: 'Anyone have tips for switching between G and C faster? I keep stumbling.',
      likes: 12,
      comments: 8,
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      author: 'RiffMaster',
      authorAvatar: 'https://i.pravatar.cc/150?u=3',
      content: 'Check out this new progression I wrote: Am - F - C - G. Classic but effective!',
      likes: 45,
      comments: 12,
      timestamp: '1 day ago'
    }
  ];

  likePost(post: Post) {
    post.likes++;
  }
}
