import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Guest} from "../../users/models/guest.model";
import {User} from "../../users/models/user.model";

@Component({
  selector: 'app-navbar-guest',
  templateUrl: './navbar-guest.component.html',
  styleUrls: ['./navbar-guest.component.css']
})
export class NavbarGuestComponent implements OnInit{
  loggedUserId!: number | undefined;
  constructor(private authService: AuthService, private router: Router) {
  }

  public ngOnInit() {
    this.loggedUserId = this.authService.getId();
  }

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
