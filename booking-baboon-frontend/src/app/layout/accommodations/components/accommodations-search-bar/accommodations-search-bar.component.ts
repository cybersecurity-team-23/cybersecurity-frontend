import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {AccommodationService} from "../../../../services/accommodation/accommodation.service";
import {AccommodationFilter} from "../../model/accommodationFilter.model";

@Component({
  selector: 'app-accommodations-search-bar',
  templateUrl: './accommodations-search-bar.component.html',
  styleUrls: ['./accommodations-search-bar.component.css']
})
export class AccommodationsSearchBarComponent implements OnInit {

  constructor(private fb: FormBuilder, private accommodationService:AccommodationService) {}

  cityInput?: String;
  startDateInput?: Date;
  endDateInput?: Date;
  guestNumInput?: number;
  isFilterShowing: boolean = false;

  ngOnInit(): void {
  }

  onSubmitClick() {
    const newFilter: AccommodationFilter = {
      city: this.cityInput,
      checkin: this.startDateInput?.toISOString().split('T')[0],
      checkout: this.endDateInput?.toISOString().split('T')[0],
    };

    this.accommodationService.filter$.next(newFilter);
  }

  onFilterButtonClick() {
   this.isFilterShowing = !this.isFilterShowing;
  }
}
