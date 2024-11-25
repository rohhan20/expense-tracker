import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './login/signup/signup.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Signup Page'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page',
        canActivate: [authGuard]
    }
];