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


  search(filter : AccommodationFilter): Observable<Accommodation[]> {
    console.log(this.convertFilterToQueryString(filter));
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/filter' + this.convertFilterToQueryString(filter))
  }

  convertFilterToQueryString(filter: AccommodationFilter): string {
    const queryParams: string[] = [];

    if (filter.city !== undefined && filter.city !== null && filter.city.length > 0) {
      queryParams.push("city=" + encodeURIComponent(filter.city));
    }
    if (filter.checkin !== undefined && filter.checkin !== null && filter.checkin.length > 0) {
      queryParams.push("checkin=" + encodeURIComponent(filter.checkin));
    }
    if (filter.checkout !== undefined && filter.checkout !== null && filter.checkout.length > 0) {
      queryParams.push("checkout=" + encodeURIComponent(filter.checkout));
    }
    if (filter.guestNum !== undefined && filter.guestNum > 0) {
      queryParams.push("guestNum=" + filter.guestNum);
    }
    if (filter.minPrice !== undefined && filter.minPrice !== null) {
      queryParams.push("min-price=" + filter.minPrice);
    }
    if (filter.maxPrice !== undefined && filter.maxPrice !== null) {
      queryParams.push("max-price=" + filter.maxPrice);
    }
    if (filter.amenities !== undefined && filter.amenities.length > 0) {
      const encodedAmenities = filter.amenities.map(amenity => encodeURIComponent(amenity)).join(",");
      queryParams.push("amenities=" + encodedAmenities);
    }
    if (filter.types !== undefined && filter.types.length > 0) {
      const encodedTypes = filter.types.map(type => encodeURIComponent(type)).join(",");
      queryParams.push("property-type=" + encodedTypes);
    }
    if (filter.minRating !== undefined && filter.minRating !== null) {
      queryParams.push("min-rating=" + filter.minRating);
    }

    return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
  }

}
