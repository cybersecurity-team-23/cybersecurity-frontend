import { Component } from '@angular/core';
import { Accommodation } from "../../model/accommodation.model";
import { ActivatedRoute } from "@angular/router";
import { AccommodationService } from "../../../../services/accommodation/accommodation.service";
import { Image } from "../../../images/image.model";
import { ImageService } from "../../../images/image.service";
import {ImageResponse} from "../../../images/imageResponse.model";

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

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId'];

      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => { this.accommodation = data; this.loadImages(); },
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

}
