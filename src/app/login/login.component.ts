import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authService: AuthService = inject(AuthService);
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  login() {
    let email = this.loginForm.value.email ?? '';
    let password = this.loginForm.value.password ?? '';
    this.authService
    .login(email, password)
    .subscribe({
      next: () => {this.router.navigate(['home']);},
      error: (error) => {this.errorMessage = error.code;}
    });
    this.router.navigate(['home']);
  }
}
