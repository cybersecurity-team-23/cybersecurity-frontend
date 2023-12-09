import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {AccommodationReview} from "../../Reviews/model/accommodation-review.model";
import {AccommodationReviewService} from "../../../services/review/accommodation-review.service";

@Component({
  selector: 'app-accommodation-reviews-dialog',
  templateUrl: './accommodation-reviews-dialog.component.html',
  styleUrls: ['./accommodation-reviews-dialog.component.css']
})
export class AccommodationReviewsDialogComponent implements OnInit{
  @Input() accommodation!: Accommodation;

  reviews!: AccommodationReview[];

  @Output() closeReviews: EventEmitter<void> = new EventEmitter<void>();

  constructor(private accommodationReviewService: AccommodationReviewService) {
  }
  ngOnInit(): void {
    this.accommodationReviewService.getAccommodationReviews(this.accommodation.id).subscribe({
      next: (data: AccommodationReview[]) => { this.reviews = data },
      error: (_) => {console.log("Error!")}
    })
    console.log(this.accommodation.id);
  }
  onCloseClick() {
    this.closeReviews.emit();
  }
}
