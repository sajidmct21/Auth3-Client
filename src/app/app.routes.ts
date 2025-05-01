import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default to home
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ForgetPasswordComponent },
    { path: 'reset-password/:token', component: ResetComponent },
    {path: 'forget-password', component:ForgetPasswordComponent},
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home' } // Catch-all route
];
