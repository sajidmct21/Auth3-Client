import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

authService = inject(AuthService)
isLoggedIn :boolean = false

ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe(res=>{
    this.isLoggedIn = this.authService.httpIsLoggedIn()
  })
}

onLogout(){
  this.authService.httpLogut();
  this.authService.isLoggedIn$.next(false)
}

}
