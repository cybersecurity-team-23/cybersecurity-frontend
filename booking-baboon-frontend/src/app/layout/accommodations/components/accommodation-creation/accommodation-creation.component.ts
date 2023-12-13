import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Amenity} from '../../model/amenity.model';
import {AmenityService} from '../../../../services/accommodation/amenity.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from "rxjs";
import {AccommodationType} from "../../model/accommodation-type.model";
import {AvailablePeriod} from "../../model/available-period.model";
import {TimeSlot} from "../../model/timeslot.model";
@Component({
  selector: 'app-accommodation-creation',
  templateUrl: './accommodation-creation.component.html',
  styleUrls: ['./accommodation-creation.component.css'],
})
export class AccommodationCreationComponent implements OnInit {
  public amenities!: Amenity[];
  public amenitiesObservable!: Observable<Amenity[]>;
  public selectedAmenities: Amenity[] = [];
  public selectorFormControl: FormControl = new FormControl();
  @ViewChild('amenityInput') amenityInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];


  urls: string[] = [];

  availablePeriods: AvailablePeriod[] = [];

  accommodationTypes = Object.values(AccommodationType).filter(key => isNaN(Number(key)));


  public accommodationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    minGuests: new FormControl(1,[Validators.min(1),Validators.required]),
    maxGuests: new FormControl(1,[Validators.min(1),Validators.required]),
    type: new FormControl(),

  });

  public periodForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    price: new FormControl(1,[Validators.min(1),Validators.required])
  },{validators: [this.validateDateRange('startDate', 'endDate'), this.futureDateValidator('startDate'), this.overlappingDatesValidator('startDate','endDate')]})


  constructor(private amenityService: AmenityService) {
  }

  ngOnInit(): void {
    this.amenityService.getAll().subscribe({
      next: (data: Amenity[]) => {
        this.amenities = data;
        this.amenitiesObservable = this.selectorFormControl.valueChanges.pipe(
          startWith(null),
          map((value: string) => (value ? this.filter(value) : this.amenities.slice()))
        );
      },
      error: (error) => {
        console.error('Error fetching amenities:', error);
      },
    });
  }

  ngAfterViewInit() {
    console.log('Amenity Input:', this.amenityInput);
  }

  private filter(value: string): Amenity[] {
    const filterValue = value.toLowerCase();
    return this.amenities.filter((amenity) => amenity.name && amenity.name.toLowerCase().includes(filterValue));
  }

  copyAmenityByName(amenityName: string): Amenity | undefined {
    const foundAmenity = this.amenities.find((amenity) => amenity.name === amenityName);

    if (foundAmenity) {
      return { ...foundAmenity };
    }

    return undefined;
  }
  add(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();

    const isDuplicate = this.selectedAmenities.some(
      (amenity) => amenity && amenity.name === value
    );


    if (!isDuplicate) {
      let amenity: Amenity|undefined = this.copyAmenityByName(value)
      if(amenity != undefined){
        this.selectedAmenities.push(amenity);
      }
      event.chipInput!.clear();
      this.selectorFormControl.setValue(null);
    }
  }

  remove(amenity: Amenity): void {
    const index = this.selectedAmenities.indexOf(amenity);

    if (index >= 0) {
      this.selectedAmenities.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedAmenity: Amenity|undefined = this.copyAmenityByName(event.option.viewValue);
    if(selectedAmenity!=undefined){
      const isDuplicate = this.selectedAmenities.some(
        (amenity) => amenity && amenity.name === selectedAmenity.name
      );
      if (!isDuplicate){
        this.selectedAmenities.push(selectedAmenity);
      }
    }


    this.amenityInput.nativeElement.value = '';
    this.selectorFormControl.setValue(null);
  }

  onselect(event: any){
    if(event.target.files){
      for(let i=0; i< event.target.files.length; i++){
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload=(events:any)=>{
          this.urls.push(events.target.result as string);
        }
      }
    }
  }

  validateDateRange(startControlName: string, endControlName: string) :ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const startDate = abstractControl.get(startControlName);
      const endDate = abstractControl.get(endControlName);
      if(!startDate||!endDate) return null;
      if (startDate.value && endDate.value && startDate.value > endDate.value) {
        const error = {confirmedValidator: 'Dates are not valid.'};
        endDate.setErrors({ dateRange: true });
        return error;
      } else {
        endDate.setErrors(null);
        return null;
      }
    };
  }

  futureDateValidator(startControlName: string):ValidatorFn {
    return (control: AbstractControl) => {
      const currentDate = new Date();
      const startDate = control.get(startControlName);
      if(!startDate) return null;
      if (startDate?.value <= currentDate) {
        const error = {confirmedValidator: 'Dates are not valid.'};
        startDate.setErrors(error)
        return { error};
      }

      return null;
    };
  }

  overlappingDatesValidator(startControlName: string, endControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null => {
      const startDate = abstractControl.get(startControlName);
      const endDate = abstractControl.get(endControlName);

      if (startDate && endDate) {
        const overlap = this.availablePeriods.some(period => this.isDateRangeOverlapping(startDate.value, endDate.value, period));
        console.log(overlap)
        if (overlap){
          const error = {confirmedValidator: 'Dates are not valid.'};
          startDate.setErrors(error)
          return error;
        }
        return null;
      }

      return null;
    };
  }

  isDateRangeOverlapping(newStartDate: Date, newEndDate: Date, existingPeriod: any): boolean {
    const existingStartDate = existingPeriod.timeslot.startDate;
    const existingEndDate = existingPeriod.timeslot.endDate;

    return (
      (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
      (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
      (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
    );
  }

  addAvailablePeriod(): void {
    if (this.periodForm.valid) {
      const newPeriod = {
        timeslot: {
          startDate: this.periodForm.value.startDate,
          endDate: this.periodForm.value.endDate
        },
        pricePerNight: this.periodForm.value.price
      };
      this.availablePeriods.push({...newPeriod});
      this.periodForm.get('startDate')?.reset()
      this.periodForm.get('endDate')?.reset()
    }
  }

  removeAvailablePeriod(index: number): void {
    this.availablePeriods.splice(index, 1);
  }


  createAccommodation() {
    //TODO
  }
}
