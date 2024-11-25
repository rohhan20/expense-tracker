import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  styleUrls: ['./signup.component.css'],
  template: `
    <div class="signup-container mat-elevation-z8">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <h2>Create Account</h2>
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSignup()">
            @if (errorMessage) {
              <div class="error-message">
                <mat-error>{{errorMessage}}</mat-error>
              </div>
            }

            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input 
                matInput 
                placeholder="Enter your name"
                formControlName="name"
                autocomplete="name">
              <mat-icon matPrefix>person</mat-icon>
              <mat-error *ngIf="signupForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input 
                matInput 
                type="email" 
                placeholder="Enter your email"
                formControlName="email"
                autocomplete="email">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="signupForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="signupForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input 
                matInput 
                [type]="hidePassword ? 'password' : 'text'"
                formControlName="password"
                autocomplete="new-password">
              <mat-icon matPrefix>lock</mat-icon>
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hidePassword = !hidePassword">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="signupForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="signupForm.get('password')?.hasError('minlength')">
                Password must be at least 8 characters
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button 
                mat-raised-button 
                color="primary" 
                type="submit"
                [disabled]="signupForm.invalid || signupForm.pending"
                class="signup-button">
                <mat-icon>person_add</mat-icon>
                Sign Up
              </button>
              <a mat-button routerLink="/" color="accent">
                Already have an account? Login
              </a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  errorMessage: string | null = null;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSignup(): void {
    if (this.signupForm.valid) {
      const { email, name, password } = this.signupForm.getRawValue();
      this.authService.register(email!, name!, password!).subscribe({
        next: () => this.router.navigate(['home']),
        error: (err) => this.errorMessage = err.code
      });
    }
  }
}
