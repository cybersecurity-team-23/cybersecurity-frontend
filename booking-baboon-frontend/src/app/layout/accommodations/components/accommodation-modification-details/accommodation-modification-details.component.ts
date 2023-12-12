import { Component } from '@angular/core';
import {Accommodation} from "../../model/accommodation.model";
import {Review} from "../../../Reviews/model/review.model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";
import {ImageService} from "../../../images/image.service";
import {HostService} from "../../../../services/user/host.service";
import {AccommodationReviewService} from "../../../../services/review/accommodation-review.service";
import {ImageResponse} from "../../../images/imageResponse.model";
import {Host} from "../../../authentication/models/host.model";
import {AccommodationReview} from "../../../Reviews/model/accommodation-review.model";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {
  AccommodationModificationService
} from "../../../../services/accommodation/accommodation-modification.service.service";

@Component({
  selector: 'app-accommodation-modification-details',
  templateUrl: './accommodation-modification-details.component.html',
  styleUrls: ['./accommodation-modification-details.component.css']
})
export class AccommodationModificationDetailsComponent {
  accommodationModification: AccommodationModification = {};
  amenities: string[] = ["Kitchen", "AC", "Free parking", "Wifi", "Balcony"];
  isFavorite = false;
  isLocationShowing: boolean = false;
  isReviewsShowing: boolean = false;
  loadedImages: string[] = [];
  averageRating!: number;
  ratingDisplay!: string;
  reviews!: Review[];

  constructor(private route: ActivatedRoute, private accommodationModificationService: AccommodationModificationService, private imageService: ImageService, private hostService: HostService, private accommodationReviewService: AccommodationReviewService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationModificationId'];

      this.accommodationModificationService.get(id).subscribe({
        next: (data: AccommodationModification) => {
          this.accommodationModification = data;
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
    if (this.accommodationModification.images) {
      this.accommodationModification.images.forEach((imageResponse: ImageResponse) => {
        this.imageService.getImage(imageResponse.id).subscribe({
          next: (imageContent: Blob) => { this.loadedImages.push(URL.createObjectURL(imageContent)); },
          error: (_) => { console.log(`Error loading image with ID ${imageResponse.id}`); }
        });
      });
    }
  }

  loadHost(): void {
    if(this.accommodationModification.host){
      this.hostService.getProfile(this.accommodationModification.host.id).subscribe({
        next: (host: Host) => { if(this.accommodationModification.host != undefined) {
          this.accommodationModification.host = host;
        }},
        error: (_) => { console.log("Error!"); }
      });
    }
  }

  loadAverageRating(): void{
    if(this.accommodationModification.accommodation){
      this.accommodationReviewService.getAverageRatingFromAccommodation(this.accommodationModification.accommodation.id).subscribe({
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
    this.accommodationReviewService.getAccommodationReviews(this.accommodationModification.accommodation?.id).subscribe({
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
    address += this.accommodationModification?.location?.address + ", "
    address += this.accommodationModification?.location?.city + ", "
    address += this.accommodationModification?.location?.country
    // return address;
    return "Bulevar oslobodjenja 5, Novi Sad";
  }

  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
