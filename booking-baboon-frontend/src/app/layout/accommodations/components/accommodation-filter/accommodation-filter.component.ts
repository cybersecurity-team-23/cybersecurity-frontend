import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccommodationType} from "../../model/accommodation-type.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Accommodation} from "../../model/accommodation.model";
import {AmenityService} from "../../../../services/accommodation/amenity.service";
import {Amenity} from "../../model/amenity.model";
import {AccommodationFilter} from "../../model/accommodationFilter.model";

@Component({
  selector: 'app-accommodation-filter',
  templateUrl: './accommodation-filter.component.html',
  styleUrls: ['./accommodation-filter.component.css']
})
export class AccommodationFilterComponent implements OnInit {
  protected readonly AccommodationType = AccommodationType;
  amenities?: Amenity[];
  priceForm: FormGroup;
  ratingForm: FormGroup;
  accommodationTypeForm: FormGroup;
  amenitiesForm: FormGroup;

  selectedFilterCount: number = 0;

  @Output() closeFilter: EventEmitter<void> = new EventEmitter<void>();
  @Output() applyFilter: EventEmitter<AccommodationFilter> = new EventEmitter<AccommodationFilter>();
  @Output() selectedFilterCountChanged: EventEmitter<number> = new EventEmitter<number>();
  constructor(private formBuilder: FormBuilder, private amenityService: AmenityService) {
    this.ratingForm = this.formBuilder.group({
      selectedRating: null,
    });

    this.accommodationTypeForm = this.formBuilder.group({
      Hotel: false,
      Hostel: false,
      BedAndBreakfast: false,
      Resort: false,
      Motel: false,
      Apartment: false,
      House: false,
      Room: false,
      Tent: false,
    });

    this.amenitiesForm = this.formBuilder.group({});

    this.priceForm = this.formBuilder.group({
      minPrice: [null, Validators.min(0)],  // Adding a validation for minimum value
      maxPrice: [null, Validators.min(0)],  // Adding a validation for minimum value
    });
  }

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {
        this.amenities = data;

        const amenityFormControls: { [key: string]: FormControl } = {};
        if (this.amenities) {
          this.amenities.forEach((amenity) => {
            amenityFormControls[amenity.name as string] = this.formBuilder.control(false);
          });
        }

        this.amenitiesForm = this.formBuilder.group({
          ...amenityFormControls,
        });
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  getEnumValues(enumType: any): string[] {
    return Object.keys(enumType).filter((key) => !isNaN(Number(enumType[key])));
  }

  onCloseClick() {
    this.closeFilter.emit();
  }

  onClearClick() {
    this.priceForm.reset();
    this.ratingForm.reset();
    this.accommodationTypeForm.reset();
    this.amenitiesForm.reset();
    this.updateSelectedFilterCount();
  }

  onApplyClick() {
    const filter: AccommodationFilter = {
      minPrice: this.priceForm.get('minPrice')?.value,
      maxPrice: this.priceForm.get('maxPrice')?.value,
      amenities: this.getSelectedAmenities(),
      types: this.getSelectedAccommodationTypes(),
      minRating: this.ratingForm.get('selectedRating')?.value,
    };

    this.applyFilter.emit(filter);
    this.updateSelectedFilterCount();
    this.onCloseClick();
  }

  private updateSelectedFilterCount() {
    this.selectedFilterCount = Object.values(this.amenitiesForm.controls)
      .filter(control => control.value === true)
      .length;

    this.selectedFilterCountChanged.emit(this.selectedFilterCount);
  }

  getSelectedAccommodationTypes(): AccommodationType[] {
    return Object.keys(this.accommodationTypeForm.controls)
      .filter((key) => this.accommodationTypeForm.get(key)?.value)
      .map((key) => key as unknown as AccommodationType);
  }

  getSelectedAmenities(): string[] {
    return Object.keys(this.amenitiesForm.controls)
      .filter((key) => this.amenitiesForm.get(key)?.value)
      .map((key) => key);
  }


}


