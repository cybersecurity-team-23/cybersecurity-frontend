import { Component } from '@angular/core';
import { Accommodation } from "../../../shared/models/accommodation.model";
import { ActivatedRoute } from "@angular/router";
import { AccommodationService } from "../../../shared/services/accommodation.service";
import { Image } from "../../../../../shared/images/image.model";
import { ImageService } from "../../../../../shared/images/image.service";
import {ImageResponse} from "../../../../../shared/images/imageResponse.model";
import {UserService} from "../../../../users/services/user.service";
import {User} from "../../../../users/models/user.model";
import {Host} from "../../../../users/models/host.model";
import {HostService} from "../../../../users/services/host.service";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {Review} from "../../../../reviews/model/review.model";
import {AccommodationReview} from "../../../../reviews/model/accommodation-review.model";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent {
  accommodation: Accommodation = {};
  amenities: string[] = ["Kitchen", "AC", "Free parking", "Wifi", "Balcony"];
  isFavorite = false;
  isLocationShowing: boolean = false;
  isReviewsShowing: boolean = false;
  loadedImages: string[] = [];
  averageRating!: number;
  ratingDisplay!: string;
  reviews!: Review[];

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private imageService: ImageService, private hostService: HostService, private accommodationReviewService: AccommodationReviewService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId'];

      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;
          this.loadImages();
          this.loadHost();
          this.loadReviews();
          this.loadAverageRating();
          },
        error: (_) => { console.log("Error!"); }
      });
    });
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

  loadHost(): void {
    if(this.accommodation.host){
      this.hostService.getProfile(this.accommodation.host.id).subscribe({
        next: (host: Host) => { this.accommodation.host = host;},
        error: (_) => { console.log("Error!"); }
      });
    }
  }

  loadAverageRating(): void{
    if(this.accommodation){
      this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodation.id).subscribe({
        next: (rating: number) => { this.averageRating = rating;
          if (isNaN(this.averageRating ?? NaN)) {
            this.ratingDisplay = "no reviews";
          }
          else {
            this.ratingDisplay = String(rating);
          }},
        error: (_) => { console.log("Error!"); }
      })
    }
  }

  loadReviews(): void{
    this.accommodationReviewService.getAccommodationReviews(this.accommodation.id).subscribe({
      next: (data: AccommodationReview[]) => { this.reviews = data },
      error: (_) => {console.log("Error!")}
    })
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  onShowLocationClick() {
    this.isLocationShowing = true;
  }
  onCloseLocation() {
    this.isLocationShowing = false;
  }

  onShowReviewsClick(){
    this.isReviewsShowing = true;
  }
  onCloseReviews() {
  this.isReviewsShowing = false;
  }




  getAddress(): string {
    let address = "";
    address += this.accommodation?.location?.address + ", "
    address += this.accommodation?.location?.city + ", "
    address += this.accommodation?.location?.country
    // return address;
    return "Bulevar oslobodjenja 5, Novi Sad";
  }

  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
