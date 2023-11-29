import {TimeSlot} from "./timeslot.model";

export interface AvailablePeriod{
  id?: number;
  timeslot?: TimeSlot;
  pricePerNight?: number;
}
