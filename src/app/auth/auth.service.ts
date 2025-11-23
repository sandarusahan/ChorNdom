import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPro?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    // Check local storage for persisted user
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Mock login
    const mockUser: User = {
      uid: 'mock-user-123',
      email: email,
      displayName: 'Mock User',
      photoURL: 'https://i.pravatar.cc/150?u=mock-user-123',
      isPro: true
    };
    return of(mockUser).pipe(
      delay(1000), // Simulate network delay
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem('mock_user', JSON.stringify(user));
      })
    );
  }

  signup(email: string, password: string): Observable<User> {
    // Mock signup
    const mockUser: User = {
      uid: 'mock-user-new-' + Date.now(),
      email: email,
      displayName: 'New User',
      photoURL: 'https://i.pravatar.cc/150?u=new-user',
      isPro: false
    };
    return of(mockUser).pipe(
      delay(1000),
      tap(user => {
        this.userSubject.next(user);
        localStorage.setItem('mock_user', JSON.stringify(user));
      })
    );
  }

  logout(): Observable<void> {
    return of(void 0).pipe(
      delay(500),
      tap(() => {
        this.userSubject.next(null);
        localStorage.removeItem('mock_user');
      })
    );
  }

  get currentUserValue(): User | null {
    return this.userSubject.value;
  }
}
