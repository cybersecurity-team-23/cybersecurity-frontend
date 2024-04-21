import {Component, Input} from '@angular/core';
import {CertificateRequest} from "../../models/certificate-request.model";
import {MatDialog} from "@angular/material/dialog";
import {GenericYesNoDialogComponent} from "../../dialogs/generic-yes-no-dialog/generic-yes-no-dialog.component";

@Component({
  selector: 'app-certificate-request',
  templateUrl: './certificate-request.component.html',
  styleUrls: ['./certificate-request.component.css']
})
export class CertificateRequestComponent {
  @Input() certificateRequest: CertificateRequest | undefined;

  constructor(private dialog: MatDialog) { }


  protected accept(): void { }
  protected decline(): void { }

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
        }

        // TODO: Add reaction to decline confirmation

      })
  }
}
