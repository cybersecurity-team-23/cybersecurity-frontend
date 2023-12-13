import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Accommodation} from "../../layout/accommodations/model/accommodation.model";
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {AccommodationModification} from "../../layout/accommodations/model/accommodation-modification.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationModificationService {

  constructor(private httpClient: HttpClient) {
  }


  getAll(): Observable<AccommodationModification[]> {
    return this.httpClient.get<AccommodationModification[]>(environment.apiHost + 'accommodation-modifications')
  }
  get(id: number): Observable<AccommodationModification> {
    return this.httpClient.get<AccommodationModification>(environment.apiHost + 'accommodation-modifications/' + id)
  }

  approve(id: number): Observable<AccommodationModification> {
    return this.httpClient.put<AccommodationModification>(environment.apiHost + 'accommodation-modifications/approve/' + id, id);
  }
  deny(id: number): Observable<AccommodationModification> {
    return this.httpClient.put<AccommodationModification>(environment.apiHost + 'accommodation-modifications/deny/' + id, id);
  }

}
