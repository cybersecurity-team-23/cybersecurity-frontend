import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";
import {AccommodationFilter} from "../../model/accommodationFilter.model";
import {HostService} from "../../../../services/user/host.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Host} from "../../../authentication/models/host.model";

@Component({
  selector: 'app-host-accommodations-list',
  templateUrl: './host-accommodations-list.component.html',
  styleUrls: ['./host-accommodations-list.component.css']
})
export class HostAccommodationsListComponent implements OnInit{
  accommodations!: Accommodation[];

  constructor(private accommodationService:AccommodationService, private hostService:HostService, private authService:AuthService) {

  }

  ngOnInit(): void {

    let id = this.authService.getId();
    if (id == undefined) return;
        this.accommodationService.getAccommodationsByHost(id).subscribe({
          next: (data: Accommodation[]) => {
            this.accommodations = data;
          },
          error: (_) => {
            console.log("Error!");
          }
        });
      }
}
