import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../services/review/accommodation-review.service";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {Accommodation} from "../../model/accommodation.model";
import {HostService} from "../../../../services/user/host.service";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";

@Component({
  selector: 'app-accommodation-modification-card',
  templateUrl: './accommodation-modification-card.component.html',
  styleUrls: ['./accommodation-modification-card.component.css']
})
export class AccommodationModificationCardComponent {
  @Input()
  accommodationModification!: AccommodationModification;
  accommodationModificationLocation!: string;
  rating!: number;
  date: string= "";
  accommodation: Accommodation = {};
  ratingDisplay!: string;
  constructor(private route: ActivatedRoute, private accommodationReviewService: AccommodationReviewService,
              private accommodationService : AccommodationService) {
  }
  ngOnInit(): void {
    if (this.accommodationModification !== undefined) {
      this.route.params.subscribe((params) => {

        this.accommodationModificationLocation = this.accommodationModification.location?.address + ", " + this.accommodationModification.location?.city + ", " + this.accommodationModification.location?.country;

        let new_Date: Date = new Date();

        let result: string = new_Date.toLocaleString();

        result = new_Date.toLocaleString("en-UK");
        this.date = result;
        this.getHost();
        this.getAverageRating();
      });

    }
  }

  getAverageRating(): void {
    this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodationModification.accommodation?.id!).subscribe({
      next: (rating: number) => { this.rating = rating;
        if (isNaN(this.rating ?? NaN)) {
          this.ratingDisplay = "no reviews";
        }
        else {
          this.ratingDisplay = String(rating);
        }},
      error: (_) => { console.log("Error!"); }
    });
  }

  getHost(): void {
    if (this.accommodationModification.accommodation?.id != undefined) {
      this.accommodationService.getAccommodation(this.accommodationModification.accommodation?.id).subscribe({
          next: (accommodation) => {
            this.accommodation = accommodation;
          }
        }
      )
    }
  }
}
