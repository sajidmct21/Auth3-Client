import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { confirmPasswordValidator } from '../../validators/confirmPassword.validator';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgIf, NgFor,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  // Step 1
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  roleService = inject(RoleService)
  router = inject(Router)

  registerForm!:FormGroup;
  roles:any[] = []

  // Step 2
 ngOnInit(): void {
   this.registerForm = this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.compose([Validators.required,Validators.email])],
    username:['',Validators.required],
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
    userRole:['', Validators.required]
   },
  {
    validators:confirmPasswordValidator('password','confirmPassword')
  })

  this.onGetAllRoles()
  // console.log(this.roles);
 }

//  Register Method
 onRegister(){
  // console.log(this.registerForm.value);
  this.authService.httpRegister(this.registerForm.value).subscribe({
    next:(res:any)=>{
      alert('User Created')
      this.registerForm.reset()
      this.router.navigate(['login'])
    },
    error:(err:Error)=>{
      console.log(err);
    }    
  })
 }

 //Get All Roles
 onGetAllRoles(){
  this.roleService.httpGetAllRoles().subscribe({
    next:(res:any)=>{
      // console.log(res.data);
      this.roles = res.data
      // console.log(this.roles);
    },
    error:(err:Error)=>{
      console.log(err);
    }
  })
 }

}
