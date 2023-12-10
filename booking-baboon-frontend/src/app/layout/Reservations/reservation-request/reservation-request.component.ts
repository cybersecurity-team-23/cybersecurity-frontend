import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccommodationService } from "../../../services/accommodation/accommodation.service";
import { Accommodation } from "../../accommodations/model/accommodation.model";

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html',
  styleUrls: ['./reservation-request.component.css']
})
export class ReservationRequestComponent implements OnInit {
  @Input() accommodation!: Accommodation;

  constructor(private fb: FormBuilder, private accommodationService: AccommodationService) {}

  requestForm!: FormGroup;
  price: string = '145';

  onSubmitClick() {
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      accommodation: [{ value: this.accommodation.name, disabled: true }, Validators.required],
      checkin: [''],
      checkout: [''],
      guestNum: ['']
    });
  }
}
