import {Component, Input} from '@angular/core';
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {AccommodationReview} from "../../Reviews/model/accommodation-review.model";

@Component({
  selector: 'app-accommodation-review-card',
  templateUrl: './accommodation-review-card.component.html',
  styleUrls: ['./accommodation-review-card.component.css']
})
export class AccommodationReviewCardComponent {
  @Input() review!: AccommodationReview;
}
