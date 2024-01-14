import {TestBed} from '@angular/core/testing';

import {ReservationService} from './reservation.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ReservationStatus} from "./models/reservation-status.enum";
import {Reservation} from "./models/reservation.model";
import {mockReservationRequest1} from "./mocks/reservation.service.mock";
import {environment} from "../../env/env";

describe('ReservationService', () => {
  let service: ReservationService;
  let httpController: HttpTestingController;

  let url = environment.apiHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call create and return the created reservation from the API', () => {
    const createdReservation: Reservation = {
      id: 1,
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
      status: ReservationStatus.Pending,
      price: 200
    };

    service.create(mockReservationRequest1).subscribe((data) => {
      expect(data).toEqual(createdReservation);
    });


    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}reservations`,
    });

    req.flush(createdReservation);
  });
});
