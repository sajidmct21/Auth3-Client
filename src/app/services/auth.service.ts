import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)
  
  httpRegister(registerObj:any):any{
    return this.http.post(`${apiUrls.authServiceApi}register`, registerObj)
  }

  httpLogin(logonObj:any){
    return this.http.post(`${apiUrls.authServiceApi}login`, logonObj)
  }

  httpLogut(){
    localStorage.removeItem("authToken");
// Then redirect to login page or home
this.router.navigate(['/login']);

  }

  httpSendEmail(email:string){
    return this.http.post(`${apiUrls.authServiceApi}send-email`, {email:email})
  }

  httpResetPassword(resetObj:any){
    return this.http.post(`${apiUrls.authServiceApi}reset-password`, resetObj)
  }


}
