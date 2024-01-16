import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ReservationRequestComponent } from './reservation-request.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MaterialModule} from "../../../infrastructure/material/material.module";
import {SharedModule} from "../../../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReservationRequestComponent', () => {
  let component: ReservationRequestComponent;
  let fixture: ComponentFixture<ReservationRequestComponent>;

  const testAccommodation: Accommodation = {
    id: 1,
    name: 'Test Accommodation',
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationRequestComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MaterialModule,
        SharedModule,
        NoopAnimationsModule
        ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRequestComponent);
    component = fixture.componentInstance;
    component.accommodation = testAccommodation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.requestForm.valid).toBeFalsy();
    expect(component.requestForm.get('accommodation')?.value).toEqual(testAccommodation.name);
    expect(component.requestForm.get('checkin')?.value).toBeNull();
    expect(component.requestForm.get('checkout')?.value).toBeNull();
    expect(component.requestForm.get('guestNum')?.value).toBeNull();
  });

});
