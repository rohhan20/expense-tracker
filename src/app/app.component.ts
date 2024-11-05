import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, 
    // AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule,
  ],
  template: `
  <main>
    <header class="brand-name">
       <app-navbar></app-navbar>
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-tracker';
}
