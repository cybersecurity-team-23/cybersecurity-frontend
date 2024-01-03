import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccommodationMonthlySummary} from "../../models/AccommodationMonthlySummary";
import {SummaryService} from "../../summary.service";
import {PeriodSummary} from "../../models/PeriodSummary";
import {Reservation} from "../../../reservations/models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../../reservations/reservation.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {AccommodationPeriodData} from "../../models/AccommodationPeriodData";

@Component({
  selector: 'app-period-summary-dialog',
  templateUrl: './period-summary-dialog.component.html',
  styleUrls: ['./period-summary-dialog.component.css']
})
export class PeriodSummaryDialogComponent implements OnInit{
  @Input() periodSummary?: PeriodSummary;
  dataSource!: MatTableDataSource<AccommodationPeriodData>;
  displayedColumns: string[] = ['accommodation', 'reservations', 'profit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() closePeriodSummary: EventEmitter<void> = new EventEmitter<void>();

  constructor(private summaryService: SummaryService) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AccommodationPeriodData>(this.periodSummary?.accommodationsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCloseClick() {
    this.closePeriodSummary.emit();
  }

  onDownloadPdfClick() {

  }
}
