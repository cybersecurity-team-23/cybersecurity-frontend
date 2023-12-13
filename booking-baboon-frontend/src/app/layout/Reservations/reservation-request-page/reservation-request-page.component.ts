import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../accommodations/model/accommodation.model";
import {HostReview} from "../../Reviews/model/host-review.model";
import {AccommodationService} from "../../../services/accommodation/accommodation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-request-page',
  templateUrl: './reservation-request-page.component.html',
  styleUrls: ['./reservation-request-page.component.css']
})
export class ReservationRequestPageComponent implements OnInit{
  accommodation!: Accommodation;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId'];

      this.accommodationService.getAccommodation(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data;
        },
        error: (_) => { console.log("Error!"); }
      });
    });


  }



}
