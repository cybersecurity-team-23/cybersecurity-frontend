import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccommodationType} from "../../accommodations/shared/models/accommodation-type.model";
import {HostReview} from "../model/host-review.model";
import {User} from "../../users/models/user.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";

@Component({
  selector: 'app-host-review-form',
  templateUrl: './host-review-form.component.html',
  styleUrls: ['./host-review-form.component.css']
})
export class HostReviewFormComponent implements OnInit{

  @Input() hostId: number = 1;
  public rating:number = 3;
  public starCount:number = 5;
  public isOpened: boolean = true;
  public reviewForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  onCloseClick(){
    this.isOpened= false;
  }



  constructor(private authService: AuthService) { }

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
      createdOn: new Date().toString(),
      rating: this.rating,
      comment: this.reviewForm.get("comment")?.value,
      reviewedHost: {
        id: this.hostId
      }
    }
    console.log(review);
  }

}
