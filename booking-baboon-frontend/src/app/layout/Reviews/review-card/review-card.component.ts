import {Component, Input} from '@angular/core';
import {AccommodationReview} from "../model/accommodation-review.model";
import {User} from "../../authentication/models/user.model";
import {UserService} from "../../../services/user/user.service";
import {Review} from "../model/review.model";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review!: Review;
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
