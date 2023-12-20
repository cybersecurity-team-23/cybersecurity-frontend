import { Component } from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserService} from "../../users/services/user.service";
import {User} from "../../users/models/user.model";
import {Observable} from "rxjs";
@Component({
  selector: 'app-navbar-host',
  templateUrl: './navbar-host.component.html',
  styleUrls: ['./navbar-host.component.css']
})
export class NavbarHostComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  user: User | undefined;

  openAccountPage(): void {
    const helper = new JwtHelperService();

    const userToken: string | null = localStorage.getItem('user');

    if (userToken != null) {
      const decodedToken = helper.decodeToken(userToken);
      // this.userService.getByEmail(decodedToken.sub).subscribe({
      //   next: (user: User) => {this.user = user;
      //     this.router.navigate(['profile/' + user.email])}
      // })
      this.router.navigate(['profile/' + decodedToken.sub])
    }
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
