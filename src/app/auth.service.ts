import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router);
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  isAuthenticated = signal<boolean>(false);

  constructor() {
    // Monitor auth state changes
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        this.isAuthenticated.set(true);
        this.currentUserSig.set({
          email: user.email ?? '',
          username: user.displayName ?? '',
          phone: 0,
          dob: new Date()
        });
      } else {
        this.isAuthenticated.set(false);
        this.currentUserSig.set(null);
        this.router.navigate(['/']);
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(response => updateProfile(
      response.user, {displayName: username}
    ));
    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}