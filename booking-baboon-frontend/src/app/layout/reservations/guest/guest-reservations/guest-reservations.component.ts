import {Component, ViewChild} from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservation.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ReservationStatus} from "../../models/reservation-status.enum";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {

  reservations!: Reservation[]
  dataSource!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['host', 'dates', 'accommodation', 'status', 'action'];
  isHostReviewShowing: boolean = false;
  isAccommodationReviewShowing: boolean = false;
  current_host_id!: number;
  current_accommodation_id!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHostReportShowing: boolean = false;


  constructor(private reservationService: ReservationService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.reservationService.getAllForGuest(this.authService.getId()).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
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

  isReviewable(reservation: Reservation):boolean{
    const sevenDaysAgo = new Date(Date());
    sevenDaysAgo.setMilliseconds(sevenDaysAgo.getMilliseconds() - 7* 86400000);
    if (!reservation.timeSlot.endDate || !reservation.status) return false;
    return  new Date(reservation.timeSlot.endDate) >= sevenDaysAgo && !this.isStatusFinished(reservation.status.toString());

  }

  isStatusFinished(status: string): boolean {
    return status.toLowerCase() !== 'finished';
  }

  isCancellable(status: string): boolean {
    return (status.toLowerCase() == 'pending' || status.toLowerCase() == 'approved') ;
  }

  onHostReviewClick(hostId: number) {
    this.current_host_id = hostId;
    this.isHostReviewShowing = true;
  }

  onCloseHostReview() {
    this.isHostReviewShowing = false;
  }

  onAccommodationReviewClick(accommodationId: number) {
    this.current_accommodation_id = accommodationId;
    this.isAccommodationReviewShowing = true;
  }

  onCloseAccommodationReview() {
    this.isAccommodationReviewShowing = false;
  }

  onCancelReservationClick(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe({
      next: (canceledReservation) => {
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onCloseHostReport() {
    this.isHostReportShowing = false;
  }

  onHostReportClick(hostId: number) {
    this.current_host_id = hostId;
    this.isHostReportShowing = true;
  }
}
