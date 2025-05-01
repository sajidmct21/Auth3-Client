import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
forgetPasswordForm !: FormGroup
authService = inject(AuthService)
  constructor(private fb:FormBuilder){
    this.forgetPasswordForm = this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })

  }

  get email(){
    return this.forgetPasswordForm.get('email')
  }
  forgetPasswordFormSubmit(){
    console.log(this.forgetPasswordForm.value);
    this.authService.httpSendEmail(this.forgetPasswordForm.value.email).subscribe({
      next:(res)=>{
        alert(res)
        this.forgetPasswordForm.reset()
      },
      error:(err)=>{
        alert(err.message)
      }
    })
  }
}
