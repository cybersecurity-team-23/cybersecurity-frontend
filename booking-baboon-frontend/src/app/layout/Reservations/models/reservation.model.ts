import {Accommodation} from "../../accommodations/model/accommodation.model";
import {TimeSlot} from "../../accommodations/model/timeslot.model";
import {Guest} from "../../authentication/models/guest.model";
import {ReservationStatus} from "./reservation-status.enum";

export interface Reservation{
  id: number;
  accommodation: Accommodation;
  timeSlot: TimeSlot;
  guest: Guest;
  price: number;
  status: ReservationStatus;
}
