import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { FirebaseDataService } from './firebase-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, 
    AngularFireAuthModule, 
    AngularFirestoreModule,
  ],
  template: `
  <main>
    @if(authService.isAuthenticated()){ <header class="brand-name">
       <app-navbar></app-navbar>
    </header> }
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'expense-tracker';
  authService = inject(AuthService); 
  dataService = inject(FirebaseDataService);

  ngOnInit() {
    // this.authService.user$.subscribe(user => {
    //   if (user) {
    //     // this.authService.currentUserSig.set({email: user.email, username: user.displayName});
    //     // Router.navigate(['/home']);
    //   } else {
    //     // this.authService.currentUserSig.set(null);
    //     // Router.navigate(['/']);
    //   }
    // });
    
    this.dataService.getExpenses().subscribe(expenses => {
      console.log(expenses);
    });
  }
}
