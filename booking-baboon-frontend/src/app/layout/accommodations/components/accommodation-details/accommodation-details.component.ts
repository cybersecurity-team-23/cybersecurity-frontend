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

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      this.accommodation = this.accommodationService.get(id);

      // this.accommodationService.get(id).subscribe({
      //   next: (data: Accommodation) => { this.accommodation = data }
      // })
    })
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
