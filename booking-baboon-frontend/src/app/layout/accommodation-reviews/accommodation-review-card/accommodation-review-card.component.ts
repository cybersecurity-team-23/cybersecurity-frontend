// accommodation-review-card.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { AccommodationReview } from '../../Reviews/model/accommodation-review.model';
import { User } from '../../authentication/models/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-accommodation-review-card',
  templateUrl: './accommodation-review-card.component.html',
  styleUrls: ['./accommodation-review-card.component.css']
})
export class AccommodationReviewCardComponent implements OnInit {
  @Input() review!: AccommodationReview;
  reviewer!: User | null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.review.reviewer?.id) {
      this.userService.getUser(this.review.reviewer.id).subscribe({
        next: (data: User) => {
          this.reviewer = data;
        },
        error: (_) => {
          console.log('Error fetching user data!');
        }
      });
    }
  }

  public getDateISOString(): string | null {
    if (this.review.createdOn) {
      return this.review.createdOn.split('T')[0];
    }
    return null;
  }
}
