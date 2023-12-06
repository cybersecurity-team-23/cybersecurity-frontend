import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../../layout/accommodations/model/accommodation.model";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {AccommodationFilter} from "../../layout/accommodations/model/accommodationFilter.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  filter$ = new BehaviorSubject<AccommodationFilter>(<AccommodationFilter>({}));
  filterState = this.filter$.asObservable();
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }

  // add(accommodation: Accommodation): Observable<Accommodation> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations', accommodation)
  // }


  search(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/filter' + this.formFilterString())
  }

  formFilterString(): string {
    const filter = this.filter$.value;
    const queryParams: string[] = [];

    if (filter.city !== undefined) {
      queryParams.push("city=" + filter.city);
    }
    if (filter.checkin !== undefined) {
      queryParams.push("checkin=" + filter.checkin);
    }
    if (filter.checkout !== undefined) {
      queryParams.push("checkout=" + filter.checkout);
    }
    if (filter.guestNum !== undefined) {
      queryParams.push("guestNum=" + filter.guestNum);
    }
    if (filter.minPrice !== undefined) {
      queryParams.push("minPrice=" + filter.minPrice);
    }
    if (filter.maxPrice !== undefined) {
      queryParams.push("maxPrice=" + filter.maxPrice);
    }
    if (filter.amenities !== undefined && filter.amenities.length > 0) {
      queryParams.push("amenities=" + filter.amenities.join(","));
    }
    if (filter.type !== undefined) {
      queryParams.push("type=" + filter.type);
    }
    if (filter.minRating !== undefined) {
      queryParams.push("minRating=" + filter.minRating);
    }

    return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
  }

}
