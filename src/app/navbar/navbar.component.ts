import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav class="navbar">
    <div class="navbar-brand" routerLink="/home">
      <span>Expense Tracker</span>
    </div>
    <ul class="navbar-links">
      <li><a routerLink="/dashboard">dashboard</a></li>
      <li><a routerLink="/expenses">Expense</a></li>
      <li><a routerLink="/profile">Profile</a></li>
      <li style="float: right"><a (click)="logout()">Logout</a></li>
    </ul>
  </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logout() {

  }
}
