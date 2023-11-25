import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Accommodation} from "../../layout/accommodations/model/accommodation.model";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodationList: Accommodation[] = [
    { id: 1, name: 'Accommodation 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu diam et erat auctor eleifend. Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Accommodation 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et.' },
    { id: 3, name: 'Accommodation 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut porta erat, vitae pretium felis. Nullam sagittis.' },
    { id: 1, name: 'Accommodation 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu diam et erat auctor eleifend. Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Accommodation 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et.' },
    { id: 3, name: 'Accommodation 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut porta erat, vitae pretium felis. Nullam sagittis.' },
    { id: 1, name: 'Accommodation 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu diam et erat auctor eleifend. Lorem ipsum dolor sit amet.' },
    { id: 2, name: 'Accommodation 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et.' },
    { id: 3, name: 'Accommodation 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut porta erat, vitae pretium felis. Nullam sagittis.' },
    { id: 1, name: 'Accommodation 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu diam et erat auctor eleifend. Lorem ipsum dolor sit amet.' },
  ];
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Accommodation[] {
    return this.accommodationList;
  }
  // getAll(): Observable<Accommodation[]> {
  //   return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  // }
  //
  // add(accommodation: Accommodation): Observable<Accommodation> {
  //   return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations', accommodation)
  // }
  //
  // getAccommodation(id: number): Observable<Accommodation> {
  //   return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  // }
}
