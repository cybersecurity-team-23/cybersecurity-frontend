import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {MatDialog} from "@angular/material/dialog";
import {GenericYesNoDialogComponent} from "../../dialogs/generic-yes-no-dialog/generic-yes-no-dialog.component";
import {SharedService} from "../../../../shared/shared.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RequestService} from "../../../../shared/request.service";

@Component({
  selector: 'app-certificate-request',
  templateUrl: './certificate-request.component.html',
  styleUrls: ['./certificate-request.component.css']
})
export class CertificateRequestComponent {
  @Input() certificateRequest: CertificateRequest | undefined;
  @Output() requestStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private requestService: RequestService,
              private sharedService: SharedService) { }

  protected accept(): void { }

  protected openDeclineRequestDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GenericYesNoDialogComponent, {
      data: {
        message: "Are you sure you want to decline this certificate request?"
      },
      enterAnimationDuration,
      exitAnimationDuration,
    })
      .afterClosed()
      .subscribe({
        next: dialogResult => {
          if (!dialogResult)
            return

          this.requestService.rejectCertificateRequest(this.certificateRequest?.id ?? 0).subscribe({
            next: (): void => {
              this.sharedService.openSnack('Certificate request successfully declined.');
              this.requestStatusChanged.emit();
            },
            error: (error: HttpErrorResponse): void => {
              if (error.status === 404)
                this.sharedService.openSnack('Certificate request not found.');
              else
                this.sharedService.openSnack('Error reaching the server.');
            }
          })
        }
      })
  }
}
