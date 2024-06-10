import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {X500Name} from "../../models/x-500-name.model";
import {RequestService} from "../../../../shared/request.service";
import {CreateCertificate} from "../../../../shared/models/create-certificate.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-accept-request-dialog',
  templateUrl: './accept-request-dialog.component.html',
  styleUrls: ['./accept-request-dialog.component.css']
})
export class AcceptRequestDialogComponent {
  protected caAliases: string[] | undefined;

  protected caAlias: string | null = null;

  protected caAliasForm: FormGroup<{
    caAlias: FormControl<string | null>,
  }> = new FormGroup<{
    caAlias: FormControl<string | null>,
  }>({
    caAlias: new FormControl<string | null>(this.caAlias, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, subject: X500Name, caAliases: string[] },
              private requestService: RequestService, private sharedService: SharedService,
              public dialogRef: MatDialogRef<AcceptRequestDialogComponent>) {
    this.caAliases = this.data.caAliases;
  }

  protected getRequiredErrorMessage(): string {
    return 'This field is required.';
  }

  protected acceptRequest(): void {
    if (!this.caAliasForm.valid)
      return;

    const certificate: CreateCertificate = {
      certificateType: 'DigitalSigning',
      caAlias: this.caAlias ?? '',
      subject: this.data.subject,
      domain: null,
    }

    this.requestService.acceptCertificateRequest(this.data.id, certificate).subscribe({
      next: (): void => {
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse): void => {
        if (error)
          this.sharedService.openSnack(error.error.message);
        else
          this.sharedService.openSnack('Error reaching the server.');
      },
    });
  }
}
