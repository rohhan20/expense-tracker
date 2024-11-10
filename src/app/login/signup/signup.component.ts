import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormField, MatLabel, ReactiveFormsModule, AngularFireAuthModule, MatError, CommonModule, MatInputModule, MatFormFieldModule],
  template: `
  <div class="signup-container">
  <form [formGroup]="signupForm" (submit)="onSignup()">
    <h2>Sign Up</h2>
    @if(errorMessage) {
      <div><{{errorMessage}}</div>
    }
    <mat-form-field appearance="fill">
      <mat-label>Name</mat-label>
      <input matInput placeholder="Your Name" formControlName= "name" required>
      <mat-error *ngIf="signupForm.controls['name'].hasError('required')">
        Name is required
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Email</mat-label>
      <input matInput type="email" placeholder="Email" formControlName="email" required>
      <mat-error *ngIf="signupForm.controls['email'].hasError('required')">
        Email is required
      </mat-error>
      <mat-error *ngIf="signupForm.controls['email'].hasError('email')">
        Invalid email address
      </mat-error>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Password</mat-label>
      <input matInput type="password" placeholder="Password" formControlName="password" required>
      <mat-error *ngIf="signupForm.controls['password'].hasError('required')">
        Password is required
      </mat-error>
      <mat-error *ngIf="signupForm.controls['password'].hasError('minlength')">
        Password must be at least 8 characters
      </mat-error>
    </mat-form-field>

    <button mat-raised-button color="primary" type="submit" [disabled]="signupForm.invalid">Sign Up</button>
  </form>
</div>
  `,
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  authService: AuthService = inject(AuthService);
  router = inject(Router);
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.minLength(8), Validators.required])
  })
  errorMessage: String | null = null;

  // constructor(private afAuth: AngularFireAuth) {}

  onSignup() {
    this.authService
    .register(this.signupForm.value.email, this.signupForm.value.name, this.signupForm.value.password)
    .subscribe({
      next: () => {this.router.navigate(['home']);},
      error: (err) => {this.errorMessage = err.code;}
    });
    // if (this.signupForm.valid) {
    //   const { email, password } = this.signupForm.value;
    //   this.afAuth.createUserWithEmailAndPassword(email, password)
    //     .then(userCredential => {
    //       // Optionally update user profile with display name
    //       if (userCredential.user) {
    //        userCredential.user.updateProfile({
    //           displayName: this.signupForm.value.name
    //         });
    //       }
    //     })
    //     .then(() => {
    //       console.log('User created successfully!');
    //       // Additional navigation logic or success messages can go here
    //     })
    //     .catch(error => {
    //       console.error('Error signing up:', error);
    //     });
    // }
  }
}
