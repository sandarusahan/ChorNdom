import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lessonId: string | null = null;
  lesson = {
    title: 'Basic Chords: C, G, D',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    content: `
      <h3>Introduction</h3>
      <p>In this lesson, we will learn the three most fundamental chords in guitar playing: C Major, G Major, and D Major.</p>
      
      <h3>The C Major Chord</h3>
      <p>Place your index finger on the 1st fret of the B string, middle finger on the 2nd fret of the D string, and ring finger on the 3rd fret of the A string.</p>
      
      <h3>The G Major Chord</h3>
      <p>There are multiple ways to play G Major. We'll start with the open position...</p>
    `
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    // In a real app, fetch lesson details by ID
  }
}
