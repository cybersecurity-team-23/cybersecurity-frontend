import { Component } from '@angular/core';
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-unauthorized',
  templateUrl: './navbar-unauthorized.component.html',
  styleUrls: ['./navbar-unauthorized.component.css']
})
export class NavbarUnauthorizedComponent {

  constructor(private authService: AuthenticationService) {
  }

}
