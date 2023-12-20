import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccommodationReviewService} from "../../../../reviews/services/accommodation-review.service";
import {AccommodationModification} from "../../model/accommodation-modification.model";
import {Accommodation} from "../../../shared/models/accommodation.model";
import {AccommodationService} from "../../../shared/services/accommodation.service";
import {SharedService} from "../../../../../shared/shared.service";
import {
  AccommodationModificationService
} from "../../accommodation-modification.service";
import {AccommodationModificationStatus} from "../../model/accommodation-modification-status";
import {Host} from "../../../../users/models/host.model";
import {HostService} from "../../../../users/services/host.service";
import {AccommodationModificationType} from "../../model/accommodation-modification-type";

@Component({
  selector: 'app-accommodation-modification-card',
  templateUrl: './accommodation-modification-card.component.html',
  styleUrls: ['./accommodation-modification-card.component.css']
})
export class AccommodationModificationCardComponent {
  protected readonly AccommodationModificationStatus = AccommodationModificationStatus;
  @Input()
  accommodationModification!: AccommodationModification;
  rating!: number;
  date: string= "";
  ratingDisplay!: string;
  constructor(private route: ActivatedRoute, private accommodationReviewService: AccommodationReviewService,
              private accommodationService : AccommodationService,
              private hostService : HostService,
              private sharedService : SharedService,
              private accommodationModificationService: AccommodationModificationService) {
  }
  ngOnInit(): void {
    if (this.accommodationModification !== undefined) {
      this.route.params.subscribe((params) => {

        this.parseDate();
        this.loadHost();
        this.getAverageRating();
      });

    }
  }


  private parseDate() {
    let new_Date: Date = new Date();
    let result: string = new_Date.toLocaleString();
    result = new_Date.toLocaleString("en-UK");
    this.date = result;
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
  onClickButtonApprove(): void {
    let newAccommodation: Accommodation = {
      name: this.accommodationModification.name,
      description: this.accommodationModification.description,
      host: this.accommodationModification.host,
      location: this.accommodationModification.location,
      amenities: this.accommodationModification.amenities,
      availablePeriods: this.accommodationModification.availablePeriods,
      minGuests: this.accommodationModification.minGuests,
      maxGuests: this.accommodationModification.maxGuests,
      isPricingPerPerson: this.accommodationModification.isPricingPerPerson,
      type: this.accommodationModification.type,
      isAutomaticallyAccepted: this.accommodationModification.isAutomaticallyAccepted,
      images: this.accommodationModification.images,
      isBeingEdited: false,
    };

    if (this.accommodationModification.requestType == AccommodationModificationType.Edited) {
      newAccommodation.id = this.accommodationModification.accommodation?.id
      this.updateAccommodation(newAccommodation);
    }
    else {
      this.createAccommodation(newAccommodation);
    }
  }
  private updateAccommodation(newAccommodation: Accommodation) {
    this.accommodationService.update(newAccommodation).subscribe({
      next: (accommodationResponse : Accommodation) => {
        //TODO: UPDATE IMAGES AND AVAILABLE PERIODS
        this.approveRequest();
      },
      error: (_) => {this.sharedService.openSnack("An error occured!")}
    })
  }

  private createAccommodation(newAccommodation: Accommodation) {
    if (this.accommodationModification.accommodation?.id)
    this.accommodationService.updateEditingStatus(this.accommodationModification.accommodation.id, false).subscribe({
      next: () => {
        this.approveRequest();
      },
      error: (_) => {this.sharedService.openSnack("An error occured!")}
    })
  }
  private approveRequest() {
    if (this.accommodationModification.id != undefined) {
      this.accommodationModificationService.approve(this.accommodationModification?.id).subscribe({
        next: (accommodationModification: AccommodationModification) => {
          this.accommodationModification.status = AccommodationModificationStatus.Approved;
          this.sharedService.openSnack("Modification approved!");
        }
      })
    }
  }
  denyRequest(): void {
    if (this.accommodationModification.id != undefined) {
      this.accommodationModificationService.deny(this.accommodationModification?.id).subscribe({
        next: (accommodationModification: AccommodationModification) => {
          this.accommodationModification.status = AccommodationModificationStatus.Denied;
          this.sharedService.openSnack("Modification denied!");
        }
      })
    }
  }
}

