import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccommodationService } from "../../../services/accommodation/accommodation.service";
import { Accommodation } from "../../accommodations/model/accommodation.model";
import {AvailablePeriod} from "../../accommodations/model/available-period.model";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html',
  styleUrls: ['./reservation-request.component.css']
})
export class ReservationRequestComponent implements OnInit {
  @Input() accommodation!: Accommodation;
  availablePeriods: AvailablePeriod[] = [];

  constructor(private fb: FormBuilder, private accommodationService: AccommodationService) {}

  requestForm!: FormGroup;
  price: string = '0';

  onSubmitClick() {
  }

  calculatePrice() {
    const accommodationId = this.accommodation.id;
    const checkin = this.getDateISOString(this.requestForm.get('checkin')?.value);
    const checkout = this.getDateISOString(this.requestForm.get('checkout')?.value);
    const guestNum = this.requestForm.get('guestNum')?.value || 0;

    if (accommodationId && checkin && checkout) {
      this.accommodationService.calculateTotalPrice(accommodationId, checkin, checkout).subscribe({
        next: (totalPrice: number) => {
          if (totalPrice !== 0 && guestNum !== 0) {
            this.price = (guestNum * totalPrice).toString();
          } else {
            this.price = "0";
          }
        },
        error: (_) => {
          console.log("Error!");
        }
      });
    }
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      accommodation: [{ value: this.accommodation.name, disabled: true }, Validators.required],
      checkin: [''],
      checkout: [''],
      guestNum: ['']
    });

    this.requestForm.valueChanges.subscribe(() => {
      this.calculatePrice();
    });

    this.availablePeriods = this.accommodation.availablePeriods || [];
  }

  private getDateISOString(date: Date | null | undefined): string | null {
    return date ? date.toISOString().split('T')[0] : null;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const currentDate = cellDate;


      const isDateInAvailablePeriod = this.availablePeriods.some((period: AvailablePeriod) => {
        const startTime = period.timeSlot?.startDate ? new Date(period.timeSlot.startDate) : null;
        const endTime = period.timeSlot?.endDate ? new Date(period.timeSlot.endDate) : null;

        return startTime && endTime && currentDate >= startTime && currentDate <= endTime;
      });

      return isDateInAvailablePeriod ? 'example-custom-date-class' : '';
    }

    return '';
  };

}
