import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirmPassword.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService)
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      });
  }

  token!: string;
  ngOnInit(): void {}

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  resetPasswordFormSubmit() {
    // console.log(this.resetPasswordForm.value);
    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
      console.log(this.token);
      this.reset();
    });
  }

  reset(){
    let resetObj = {
      token:this.token,
      password :this.resetPasswordForm.value.password
    }
    this.authService.httpResetPassword(resetObj).subscribe({
      next:(res)=>{
        alert(res)
        this.resetPasswordForm.reset()
        this.router.navigate(['login'])
        
      },
      error:(err)=>{
        alert(err.message)
      }
    })
  }
}
