import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <section class="login-container">
    <form [formGroup]="loginForm" (submit)="login()">
      <input id="email" type="email" title="username" placeholder="username" />
      <input id="password" type="password" placeholder="password"/>
      <button class="submit" type="submit" [disabled]="!loginForm.valid">Login</button>
    </form>
  </section>`,
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router){ }

  login() {
    let email = this.loginForm.value.email ?? '';
    let password = this.loginForm.value.password ?? '';
    console.log(email, password);
    this.router.navigate(['home']);
  }
}
