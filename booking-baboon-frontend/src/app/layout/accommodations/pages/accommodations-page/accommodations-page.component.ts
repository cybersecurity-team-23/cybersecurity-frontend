import { Component } from '@angular/core';
import {AuthenticationService} from "../../../authentication/services/authentication.service";

@Component({
  selector: 'app-accommodations-page',
  templateUrl: './accommodations-page.component.html',
  styleUrls: ['./accommodations-page.component.css']
})
export class AccommodationsPageComponent {
  userType: string = 'unauthorized';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }
}
