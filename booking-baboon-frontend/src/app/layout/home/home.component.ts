import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userType: string = 'unauthorized';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }
}
