import {Component, ViewChild} from '@angular/core';
import {Reservation} from "../../models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservation.service";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {

  reservations!: Reservation[]
  dataSource!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['host', 'dates', 'accommodation', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationService) {

  }

  ngOnInit(): void {
    this.reservationService.getAll().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data
        this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
  }
}
