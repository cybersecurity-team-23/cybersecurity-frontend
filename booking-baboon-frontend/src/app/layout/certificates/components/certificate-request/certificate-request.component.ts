import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {MatDialog} from "@angular/material/dialog";
import {GenericYesNoDialogComponent} from "../../dialogs/generic-yes-no-dialog/generic-yes-no-dialog.component";
import {SharedService} from "../../../../shared/shared.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RequestService} from "../../../../shared/request.service";
import {AcceptRequestDialogComponent} from "../../dialogs/accept-request-dialog/accept-request-dialog.component";

@Component({
  selector: 'app-certificate-request',
  templateUrl: './certificate-request.component.html',
  styleUrls: ['./certificate-request.component.css']
})
export class CertificateRequestComponent {
  @Input() certificateRequest: CertificateRequest | undefined;
  @Output() requestDeclined: EventEmitter<any> = new EventEmitter<any>();
  @Output() requestAccepted: EventEmitter<any> = new EventEmitter<any>();

  @Input() caAliases: string[] | undefined;

  constructor(private dialog: MatDialog, private requestService: RequestService,
              private sharedService: SharedService) { }

  protected openAcceptRequestDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AcceptRequestDialogComponent, {
      data: {
        id: this.certificateRequest?.id,
        subject: {
          email: this.certificateRequest?.email,
          commonName: this.certificateRequest?.commonName,
          organisationalUnit: this.certificateRequest?.organisationalUnit,
          organisation: this.certificateRequest?.organisation,
          location: this.certificateRequest?.location,
          state: this.certificateRequest?.state,
          country: this.certificateRequest?.country,
        },
        caAliases: this.caAliases,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult) {
          this.sharedService.openSnack('Certificate request successfully accepted.');
          this.requestAccepted.emit();
        }
      }
    });
  }

  protected openDeclineRequestDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenericYesNoDialogComponent, {
      data: {
        message: "Are you sure you want to decline this certificate request?",
      },
      enterAnimationDuration,
      exitAnimationDuration,
    })
      .afterClosed()
      .subscribe({
        next: dialogResult => {
          if (!dialogResult)
            return;

          this.requestService.rejectCertificateRequest(this.certificateRequest?.id ?? 0).subscribe({
            next: (): void => {
              this.sharedService.openSnack('Certificate request successfully declined.');
              this.requestDeclined.emit();
            },
            error: (error: HttpErrorResponse): void => {
              if (error)
                this.sharedService.openSnack(error.error.message);
              else
                this.sharedService.openSnack('Error reaching the server.');
            },
          });
        },
      });
  }
}
