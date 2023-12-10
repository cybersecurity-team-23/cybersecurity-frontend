import {Component, Input} from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../services/review/accommodation-review.service";

@Component({
  selector: 'app-host-accommodation-card',
  templateUrl: './host-accommodation-card.component.html',
  styleUrls: ['./host-accommodation-card.component.css']
})
export class HostAccommodationCardComponent {
  @Input()
  accommodation!: Accommodation;

  accommodationLocation: string | undefined;
  rating: number | undefined;
  ratingDisplay: string | undefined;
  constructor(private route: ActivatedRoute, private accommodationReviewService: AccommodationReviewService) {
  }
  ngOnInit(): void {
    if (this.accommodation !== undefined) {
      this.route.params.subscribe((params) => {

        this.accommodationLocation = this.accommodation.location?.address + ", " + this.accommodation.location?.city + ", " + this.accommodation.location?.country;

        this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodation.id!).subscribe({
          next: (rating: number) => { this.rating = rating;
            if (isNaN(this.rating ?? NaN)) {
              this.ratingDisplay = "no reviews";
            }
            else {
              this.ratingDisplay = String(rating);
            }},
          error: (_) => { console.log("Error!"); }
        });
      });

    }
  }
}
