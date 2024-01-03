import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Reservation} from "./models/reservation.model";
import {Accommodation} from "../accommodations/shared/models/accommodation.model";
import {TimeSlot} from "../accommodations/shared/models/timeslot.model";
import {Guest} from "../users/models/guest.model";

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

  getAllForGuest(id: number | undefined): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'reservations/guest/' + id)
  }

  approve(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/approve", {})
  }

  deny(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/deny", {})  }

  cancel(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/cancel", {})  }
}
