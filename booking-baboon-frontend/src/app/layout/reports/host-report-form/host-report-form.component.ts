import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {HostReport} from "../models/host-report.model";
import {HostReportService} from "../services/host-report.service";
import {ReportStatus} from "../models/report.model";

@Component({
  selector: 'app-host-report-form',
  templateUrl: './host-report-form.component.html',
  styleUrls: ['./host-report-form.component.css']
})
export class HostReportFormComponent implements OnInit{
  @Input() hostId!: number;


  public reportForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @Output() closeReport: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closeReport.emit();
  }




  constructor(private authService: AuthService, private reportService: HostReportService) { }

  ngOnInit() {
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  submit() {
    if (!this.reportForm.valid) return
    let report : HostReport = {
      reportee: {
        id: this.authService.getId()
      },
      message: this.reportForm.get("message")?.value,
      createdOn: this.getDateISOString(new Date()),
      status: ReportStatus.Pending,
      reportedHost: {
        id: this.hostId
      }
    }
    this.reportService.create(report).subscribe({
      next: data => {
        console.log(data);
        this.closeReport.emit();
      }
    })
  }
}
