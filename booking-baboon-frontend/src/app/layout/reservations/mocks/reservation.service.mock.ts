import {ReservationStatus} from "../models/reservation-status.enum";
import {Reservation} from "../models/reservation.model";
import {ReservationRequest} from "../models/reservation-request.model";

const mockReservationRequest1: ReservationRequest = {
  accommodation: {
    id: 1
  },
  timeSlot: {
    startDate: '2024-04-15',
    endDate: '2024-04-20'
  },
  guest: {
    id: 5
  },
  price: 200
};


export { mockReservationRequest1};
