import { Component } from '@angular/core';
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {AccommodationFilter} from "../../model/accommodationFilter.model";
import {BehaviorSubject} from "rxjs";
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodations-page',
  templateUrl: './accommodations-page.component.html',
  styleUrls: ['./accommodations-page.component.css']
})
export class AccommodationsPageComponent {
  userType: string = 'unauthorized';
  filter: AccommodationFilter = {};
  accommodations!: Accommodation[];



  constructor(private authService: AuthenticationService,  private accommodationService:AccommodationService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
  }

  onSearchClicked(accommodationFilter: AccommodationFilter): void {
    this.accommodationService.search(accommodationFilter).subscribe({
      next: (data: Accommodation[]) => {
        this.accommodations = data;
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
