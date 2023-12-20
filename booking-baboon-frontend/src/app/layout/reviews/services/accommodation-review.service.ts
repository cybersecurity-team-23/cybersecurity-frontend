import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {AccommodationReview} from "../model/accommodation-review.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationReviewService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<AccommodationReview[]> {
    return this.httpClient.get<AccommodationReview[]>(environment.apiHost + 'accommodation-reviews')
  }

  getAccommodationReview(id: number): Observable<AccommodationReview> {
    return this.httpClient.get<AccommodationReview>(environment.apiHost + 'accommodation-reviews/' + id)
  }

  getAverageRatingFromAccommodation(accommodationId: number | undefined): Observable<number> {
    return this.httpClient.get<number>(environment.apiHost + 'accommodation-reviews/average-rating/' + accommodationId)
  }

  getAccommodationReviews(accommodationId: number | undefined): Observable<AccommodationReview[]>{
    return this.httpClient.get<AccommodationReview[]>(environment.apiHost + 'accommodation-reviews/accommodation/' + accommodationId)
  }
  // add(accommodation-review: AccommodationReview): Observable<AccommodationReview> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<AccommodationReview>(environment.apiHost + 'accommodation-reviews', accommodation-review)
  // }


}
