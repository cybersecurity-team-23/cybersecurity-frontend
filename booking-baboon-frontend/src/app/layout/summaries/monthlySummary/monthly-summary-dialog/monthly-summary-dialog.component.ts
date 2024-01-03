import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AccommodationMonthlySummary} from "../../models/AccommodationMonthlySummary";
import {SummaryService} from "../../summary.service";
import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-monthly-summary-dialog',
  templateUrl: './monthly-summary-dialog.component.html',
  styleUrls: ['./monthly-summary-dialog.component.css']
})
export class MonthlySummaryDialogComponent implements OnInit{

  @Input() accommodationId?: number;
  summaryData!: AccommodationMonthlySummary;
  constructor(private summaryService: SummaryService) {
  }
  ngOnInit(): void {
    this.summaryService.getMonthlySummary(this.accommodationId).subscribe({
      next:(data: AccommodationMonthlySummary) => {
        this.summaryData = data;
      }
    })
  }

  @Output() closeMonthlySummary: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeMonthlySummary.emit();
  }

  onDownloadPdfClick() {

  }
}
