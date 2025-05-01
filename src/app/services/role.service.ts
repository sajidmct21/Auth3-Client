import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  http = inject(HttpClient);
  // constructor(public http:HttpClient){  }

  httpGetAllRoles():any{
    return this.http.get(`http://localhost:3000/role/getAllRoles`)
  }
  
}

