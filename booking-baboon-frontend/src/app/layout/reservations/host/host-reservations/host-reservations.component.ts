import {Component, ViewChild} from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {HostReservation} from "../../models/host-reservation.model";
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";
import {TimeSlot} from "../../../accommodations/shared/models/timeslot.model";
import {Guest} from "../../../users/models/guest.model";
import {ReservationStatus} from "../../models/reservation-status.enum";

@Component({
  selector: 'app-host-reservations',
  templateUrl: './host-reservations.component.html',
  styleUrls: ['./host-reservations.component.css']
})
export class HostReservationsComponent {
  reservations: HostReservation[] = [];
  dataSource!: MatTableDataSource<HostReservation>;
  displayedColumns: string[] = ['user', 'cancellations', 'dates', 'accommodation', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.reservationService.getAllForHost(this.authService.getId()).subscribe({
      next: (data: Reservation[]) => {

        //Convert to HostReservations
        const transformedReservations = data.map(reservation => {
          const hostReservation: HostReservation = {
            id: reservation.id,
            accommodation: reservation.accommodation,
            timeSlot: reservation.timeSlot,
            guest: reservation.guest,
            price: reservation.price,
            status: reservation.status,
            cancellationCount: 0,
          };

          this.reservationService.getCancellationCount(reservation.guest.id).subscribe({
            next: (cancellationCount: number) => {
              hostReservation.cancellationCount = cancellationCount;
              this.dataSource.data = transformedReservations;
            },
            error: (_) => {
              console.log("Error fetching cancellation count!");
            }
          });
          return hostReservation;
        });

        this.dataSource = new MatTableDataSource<HostReservation>(transformedReservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {
        console.log("Error fetching reservations!");
      }
    });
  }

  getStatusColor(status: string): { [key: string]: string } {
    switch (status.toLowerCase()) {
      case 'approved':
        return { color: 'green' };
      case 'denied':
        return { color: 'red' };
      case 'finished':
        return { 'font-weight': 'bold'};
      default:
        return {};
    }
  }


  isPending(status: string): boolean {
    return status.toLowerCase() == 'pending';
  }


  onApproveReservationClick(reservationId: number) {

  }

  onDenyReservationClick(reservationId: number) {

  }

  onGuestReportClick(guestId: number) {
    // this.current_guest_id = guestId;
    // this.isGuestReportShowing = true;
  }
}
