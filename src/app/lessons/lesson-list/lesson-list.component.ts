import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Lesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  completed: boolean;
}

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {
  lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Guitar',
      description: 'Learn the basics of holding the guitar and tuning.',
      thumbnail: 'https://picsum.photos/seed/lesson1/300/200',
      duration: '10 min',
      completed: true
    },
    {
      id: '2',
      title: 'Basic Chords: C, G, D',
      description: 'Master the most common open chords.',
      thumbnail: 'https://picsum.photos/seed/lesson2/300/200',
      duration: '15 min',
      completed: false
    },
    {
      id: '3',
      title: 'Strumming Patterns 101',
      description: 'Get your rhythm right with basic strumming.',
      thumbnail: 'https://picsum.photos/seed/lesson3/300/200',
      duration: '12 min',
      completed: false
    },
    {
      id: '4',
      title: 'Fingerstyle Basics',
      description: 'Introduction to fingerpicking techniques.',
      thumbnail: 'https://picsum.photos/seed/lesson4/300/200',
      duration: '20 min',
      completed: false
    }
  ];
}
