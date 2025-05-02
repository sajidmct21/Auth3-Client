import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  // Injected Services
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loginFormSubmit() {
    if (this.loginForm.valid) {
      this.authService.httpLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          alert('Login Successfully');
          console.log(res.data)
          const token = res.data;
          localStorage.setItem('user_id',res.data._id)
          localStorage.setItem('authToken', res.data.token);
          this.authService.isLoggedIn$.next(true)
          console.log(res.data.token);
          this.router.navigate(['home']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.log(err);
          alert(err.message);
        },
      });
    }
  }
}
