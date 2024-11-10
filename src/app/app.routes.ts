import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './login/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login Page' 
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Signup Page'
    }
];
