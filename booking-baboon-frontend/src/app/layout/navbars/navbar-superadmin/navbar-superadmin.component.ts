import { Component } from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-superadmin',
  templateUrl: './navbar-superadmin.component.html',
  styleUrls: ['./navbar-superadmin.component.css']
})
export class NavbarSuperadminComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe({
      next: (_: string): void => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['login']);
      },
      error: (): void => {
        this.router.navigate(['login']);
      },
    })
  }
}
