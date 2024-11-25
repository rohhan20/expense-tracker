import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
  <nav class="navbar" *ngIf="authService.isAuthenticated()">
    <div class="navbar-brand" routerLink="/home">
      <span>Expense Tracker</span>
    </div>
    <ul class="navbar-links">
      <li><a routerLink="/dashboard">Dashboard</a></li>
      <li><a routerLink="/expenses">Expense</a></li>
      <li><a routerLink="/profile">Profile</a></li>
      <li style="float: right"><a (click)="logout()">Logout</a></li>
    </ul>
  </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout().subscribe();
  }
}
