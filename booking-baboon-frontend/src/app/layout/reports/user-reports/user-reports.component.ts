import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {ReviewService} from "../../reviews/services/review.service";
import {HostReviewService} from "../../reviews/services/host-review.service";
import {AccommodationReviewService} from "../../reviews/services/accommodation-review.service";
import {UserReport} from "../models/user-report.model";
import {UserReportService} from "../services/user-report.service";

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent {
  userReports!: UserReport[]
  dataSource!: MatTableDataSource<UserReport>;
  displayedColumns: string[] = ['reportee', 'reportedUser', 'created on', 'message', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userReportService: UserReportService,
              private authService: AuthService,
              private reviewService: ReviewService,
              private hostReviewService: HostReviewService,
              private accommodationReviewService: AccommodationReviewService) {
  }

  ngOnInit(): void {
    this.userReportService.getAll().subscribe({
      next: (data: UserReport[]) => {
        this.userReports = data
        this.dataSource = new MatTableDataSource<UserReport>(this.userReports);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {console.log("Greska!")}
    })
  }


  onBlockUserReport(userReport: UserReport): void {
  }
}
