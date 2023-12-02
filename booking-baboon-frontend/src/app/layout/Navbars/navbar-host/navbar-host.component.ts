import { Component } from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-host',
  templateUrl: './navbar-host.component.html',
  styleUrls: ['./navbar-host.component.css']
})
export class NavbarHostComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      }
    })
  }

}
