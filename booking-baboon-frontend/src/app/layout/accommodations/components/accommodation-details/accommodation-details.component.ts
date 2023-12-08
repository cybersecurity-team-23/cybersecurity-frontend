import { Component } from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
  accommodation?: Accommodation;
  amenities: string[] = ["Kitchen", "AC", "Free parking", "Wifi", "Balcony"];
  isFavorite = false;
  isLocationShowing: boolean = false;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']

      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => { this.accommodation = data },
        error: (_) => {console.log("Error!")}
      })
    })
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onCloseLocation() {
    this.isLocationShowing = false;
  }

  onShowLocationClick() {
    this.isLocationShowing = true;
  }

  getAddress(): string {
    let address = "";
    address += this.accommodation?.location?.address + ", "
    address += this.accommodation?.location?.city + ", "
    address += this.accommodation?.location?.country
    // return address;
    return "Bulevar oslobodjenja 5, Novi Sad";
  }

}
