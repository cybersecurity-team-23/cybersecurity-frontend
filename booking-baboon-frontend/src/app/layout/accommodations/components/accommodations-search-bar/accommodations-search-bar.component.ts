import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-accommodations-search-bar',
  templateUrl: './accommodations-search-bar.component.html',
  styleUrls: ['./accommodations-search-bar.component.css']
})
export class AccommodationsSearchBarComponent implements OnInit {
  dateRangeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      start: [{ value: null, disabled: true }],
      end: [{ value: null, disabled: true }]
    });
  }
}
