import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccommodationMonthlySummary} from "../../models/AccommodationMonthlySummary";
import {SummaryService} from "../../summary.service";
import * as html2pdf from "html2pdf.js";
import {AccommodationService} from "../../../accommodations/shared/services/accommodation.service";
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";

@Component({
  selector: 'app-monthly-summary-dialog',
  templateUrl: './monthly-summary-dialog.component.html',
  styleUrls: ['./monthly-summary-dialog.component.css']
})
export class MonthlySummaryDialogComponent implements OnInit{

  @Input() accommodationId?: number;
  summaryData!: AccommodationMonthlySummary;
  accommodation!: Accommodation;
  constructor(private summaryService: SummaryService, private accomodationService: AccommodationService) {
  }
  ngOnInit(): void {
    this.summaryService.getMonthlySummary(this.accommodationId).subscribe({
      next:(data: AccommodationMonthlySummary) => {
        this.summaryData = data;

        this.accomodationService.getAccommodation(this.summaryData.accommodationId).subscribe({
          next:(accommodation: Accommodation) => {
            this.accommodation = accommodation;
          }
        });
      }
    })
  }

  @Output() closeMonthlySummary: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeMonthlySummary.emit();
  }

  onDownloadPdfClick() {
    const pdfContent = this.generatePdfContent();
    const options = {
      margin: 10,
      filename: 'monthly_summary.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(pdfContent).set(options).save();
  }

  private generatePdfContent(): string {
    let content = `
      <h1>SUMMARY</h1>
      <p>Accommodation: ${this.accommodation.name}</p>
      <p>Period: ${this.summaryData.timeSlot.startDate} - ${this.summaryData.timeSlot.endDate}</p>
      <p><strong>Reservations by Month:</strong></p>
      <ul>`;

    for (const month in this.summaryData.reservationsData) {
      const loweredMonth = this.capitalizeFirstLetter(month.toLowerCase());
      content += `<li>${loweredMonth}: ${this.summaryData.reservationsData[month]}</li>`;
    }

    content += `</ul>
      <p><strong>Profit by Month:</strong></p>
      <ul>`;

    for (const month in this.summaryData.profitData) {
      const loweredMonth = this.capitalizeFirstLetter(month.toLowerCase());
      content += `<li>${loweredMonth}: ${this.summaryData.profitData[month]}€</li>`;
    }

    content += `</ul>`;

    return content;
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

