import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Accommodation} from "../../layout/accommodations/model/accommodation.model";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";

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


}
