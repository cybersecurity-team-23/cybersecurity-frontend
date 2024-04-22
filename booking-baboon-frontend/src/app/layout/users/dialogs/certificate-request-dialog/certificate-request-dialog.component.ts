import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {RequestService} from "../../../../shared/request.service";
import {CreateRequest} from "../../models/create-request.model";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-certificate-request-dialog',
  templateUrl: './certificate-request-dialog.component.html',
  styleUrls: ['./certificate-request-dialog.component.css']
})
export class CertificateRequestDialogComponent {
  certificateRequestForm: FormGroup<{
    organisation: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    country: FormControl<string | null>,
  }> = new FormGroup<{
    organisation: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    country: FormControl<string | null>,
  }>({
    organisation: new FormControl<string | null>(''),
    organisationalUnit: new FormControl<string | null>(''),
    country: new FormControl<string | null>(''),
  });

  constructor(public dialogRef: MatDialogRef<CertificateRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {user: User},
              private requestService: RequestService, private sharedService: SharedService) { }


  createCertificateRequest(): void {
    const createRequest: CreateRequest = {
      commonName: this.data.user.firstName + ' ' + this.data.user.lastName,
      surname: this.data.user.lastName ?? '',
      givenName: this.data.user.firstName ?? '',
      organisation: this.certificateRequestForm.value.organisation ?? '',
      organisationalUnit: this.certificateRequestForm.value.organisationalUnit ?? '',
      country: this.certificateRequestForm.value.country ?? '',
      email: this.data.user.email ?? '',
      uid: this.data.user.id ?? 0
    }

    this.requestService.createRequest(createRequest).subscribe({
      next: (): void => this.dialogRef.close(true),
      error: (): void => {
        this.sharedService.openSnack("Error reaching the server.");
        this.dialogRef.close(false);
      },
    })
  }
}
