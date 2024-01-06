import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Reservation} from "../../reservations/models/reservation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReservationService} from "../../reservations/reservation.service";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {ReviewReport} from "../models/review-report.model";
import {ReviewReportService} from "../services/review-report.service";
import {Review} from "../../reviews/model/review.model";
import {ReviewService} from "../../reviews/services/review.service";

@Component({
  selector: 'app-admin-review-reports',
  templateUrl: './admin-review-reports.component.html',
  styleUrls: ['./admin-review-reports.component.css']
})
export class AdminReviewReportsComponent {
  reviewReports!: ReviewReport[]
  dataSource!: MatTableDataSource<ReviewReport>;
  displayedColumns: string[] = ['reportee', 'created on', 'message', 'reviewer', 'comment', 'rating', 'action'];
  isHostReviewShowing: boolean = false;
  isAccommodationReviewShowing: boolean = false;
  current_host_id!: number;
  current_accommodation_id!: number;
  tooltipMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isHostReportShowing: boolean = false;


  constructor(private reviewReportService: ReviewReportService,
              private authService: AuthService,
              private reviewService: ReviewService) {

  }

  ngOnInit(): void {
    this.reviewReportService.getAll().subscribe({
      next: (data: ReviewReport[]) => {
        this.reviewReports = data
        this.dataSource = new MatTableDataSource<ReviewReport>(this.reviewReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
  }


  onDeleteReviewReportClick(reviewReport: ReviewReport): void {
    if (reviewReport.id) {
      this.reviewReportService.remove(reviewReport.id).subscribe({
        next(data) {
          console.log("mrs");
        }, error() {
          console.log("error");
        }
      });
    }
    if (reviewReport.reportedReview?.id) {
      this.reviewService.remove(reviewReport.reportedReview.id).subscribe();
    }
    window.location.reload();

  }
}

