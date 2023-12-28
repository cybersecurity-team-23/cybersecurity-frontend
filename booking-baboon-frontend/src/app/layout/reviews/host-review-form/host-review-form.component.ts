import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationType} from "../../accommodations/shared/models/accommodation-type.model";
import {HostReview} from "../model/host-review.model";
import {User} from "../../users/models/user.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReviewService} from "../services/host-review.service";

@Component({
  selector: 'app-host-review-form',
  templateUrl: './host-review-form.component.html',
  styleUrls: ['./host-review-form.component.css']
})
export class HostReviewFormComponent implements OnInit{

  @Input() hostId!: number;
  public rating:number = 3;
  public starCount:number = 5;
  public reviewForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  @Output() closeReview: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReview.emit();
    console.log(this.hostId)
  }




  constructor(private authService: AuthService, private reviewService: HostReviewService) { }

  ngOnInit() {
  }
  onRatingChanged(rating: number){
    console.log(rating);
    this.rating = rating;
  }

  submit() {
    if (!this.reviewForm.valid) return
    let review : HostReview = {
      reviewer: {
        id: this.authService.getId()
      },
      createdOn: new Date().getDate().toString(),
      rating: this.rating,
      comment: this.reviewForm.get("comment")?.value,
      reviewedHost: {
        id: this.hostId
      }
    }
    this.reviewService.create(review).subscribe({
      next: data => {
        console.log(data);
      }
    })
  }

}
