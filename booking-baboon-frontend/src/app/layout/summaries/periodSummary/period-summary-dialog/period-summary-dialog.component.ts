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
import * as html2pdf from "html2pdf.js";

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
    const pdfContent = this.generatePdfContent();
    const options = {
      margin: 10,
      filename: 'period_summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(pdfContent).set(options).save();
  }

  private generatePdfContent(): string {
    let content = `
      <h2>SUMMARY</h2>
      <p>Period: ${this.periodSummary?.period.startDate} - ${this.periodSummary?.period.endDate}</p>
      <table style="width: 100%; text-align: center;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 8px;">Accommodation</th>
          <th style="padding: 8px;">Reservations</th>
          <th style="padding: 8px;">Profit</th>
        </tr>
      </thead>
      <tbody>`;

    this.periodSummary?.accommodationsData.forEach((accommodationData) => {
      content += `
        <tr style="border-top: 0.5px solid #bababa;">
          <td style="text-align: left; padding: 8px;">${accommodationData.accommodationName}</td>
          <td style="padding: 8px;">${accommodationData.reservationsCount}</td>
          <td style="padding: 8px;">${accommodationData.totalProfit}€</td>
        </tr>`;
    });

    content += `
        </tbody>
      </table>`;

    return content;
  }
}

