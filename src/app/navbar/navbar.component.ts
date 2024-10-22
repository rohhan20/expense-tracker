import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav class="navbar">
    <div class="navbar-logo">
      <img src="assets/app_logo.png" alt="My App Logo"/>
    </div>
    <ul class="navbar-links">
      <li><a routerLink="home">Home</a></li>
      <li><a routerLink="about">About</a></li>
      <li><a routerLink="services">Services</a></li>
      <li><a routerLink="/about">About</a></li>
      <li><a routerLink="contact">Blog</a></li>
      <li style="float:right"><a routerlink = 'login'>Login</a></li>
    </ul>
  </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
