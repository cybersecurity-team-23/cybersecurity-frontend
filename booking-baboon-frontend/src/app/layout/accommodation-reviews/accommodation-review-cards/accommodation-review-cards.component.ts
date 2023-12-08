import {Component, Input} from '@angular/core';
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {AccommodationReview} from "../../Reviews/model/accommodation-review.model";

@Component({
  selector: 'app-accommodation-review-cards',
  templateUrl: './accommodation-review-cards.component.html',
  styleUrls: ['./accommodation-review-cards.component.css']
})
export class AccommodationReviewCardsComponent {
  @Input() reviews!: AccommodationReview[];
}
