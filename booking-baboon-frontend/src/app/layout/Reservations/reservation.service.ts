import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Reservation} from "./models/reservation.model";
import {Accommodation} from "../accommodations/model/accommodation.model";
import {TimeSlot} from "../accommodations/model/timeslot.model";
import {Guest} from "../authentication/models/guest.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'reservations')
  }

  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiHost + 'reservations/' + id)
  }

  create(reservation: Reservation): Observable<Reservation>{
    const requestBody = {
      accommodation: reservation.accommodation,
      timeSlot: reservation.timeSlot,
      guest: reservation.guest,
      price: reservation.price
    }

    return this.httpClient.post<Reservation>(environment.apiHost + 'reservations', requestBody);
  }
}
