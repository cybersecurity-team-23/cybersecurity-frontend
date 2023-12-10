import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {AccommodationReview} from "../model/accommodation-review.model";
import {AccommodationReviewService} from "../../../services/review/accommodation-review.service";
import {Review} from "../model/review.model";

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.css']
})
export class ReviewsDialogComponent {
  @Input() reviews!: Review[];

  @Output() closeReviews: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReviews.emit();
  }
}
