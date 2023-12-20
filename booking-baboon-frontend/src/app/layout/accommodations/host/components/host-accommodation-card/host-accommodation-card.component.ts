import {Component, Input, OnInit} from '@angular/core';
import {Accommodation} from "../../../shared/models/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {ImageService} from "../../../../../shared/images/image.service";

@Component({
  selector: 'app-host-accommodation-card',
  templateUrl: './host-accommodation-card.component.html',
  styleUrls: ['./host-accommodation-card.component.css']
})
export class HostAccommodationCardComponent implements OnInit{

  @Input() accommodation!: Accommodation;

  accommodationLocation: string | undefined;
  rating: number | undefined;
  ratingDisplay: string | undefined;
  loadedImages: string[] = [];
  constructor(private route: ActivatedRoute, private accommodationReviewService: AccommodationReviewService, private imageService: ImageService) {
  }

  ngOnInit(): void {
    if (this.accommodation) {
      this.route.params.subscribe((params) => {
        this.loadImages();
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

  loadImages(): void {
    if (this.accommodation.images) {
      this.accommodation.images.forEach((imageResponse: ImageResponse) => {
        this.imageService.getImage(imageResponse.id).subscribe({
          next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
          error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
        });
      });
    }
  }
}
