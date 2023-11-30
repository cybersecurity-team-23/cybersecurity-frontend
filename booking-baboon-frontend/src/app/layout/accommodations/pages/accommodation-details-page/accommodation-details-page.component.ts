import { Component } from '@angular/core';
import {AuthenticationService} from "../../../authentication/services/authentication.service";

@Component({
  selector: 'app-accommodation-details-page',
  templateUrl: './accommodation-details-page.component.html',
  styleUrls: ['./accommodation-details-page.component.css']
})
export class AccommodationDetailsPageComponent {
  userType: string = 'unauthorized';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }
}
