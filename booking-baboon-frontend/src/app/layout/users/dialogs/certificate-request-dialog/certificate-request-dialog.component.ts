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
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>,
  }> = new FormGroup<{
    organisation: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>,
  }>({
    organisation: new FormControl<string | null>(''),
    organisationalUnit: new FormControl<string | null>(''),
    location: new FormControl<string | null>(''),
    state: new FormControl<string | null>(''),
    country: new FormControl<string | null>(''),
  });

  constructor(public dialogRef: MatDialogRef<CertificateRequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {user: User},
              private requestService: RequestService, private sharedService: SharedService) { }


  createCertificateRequest(): void {
    const createRequest: CreateRequest = {
      email: this.data.user.email ?? '',
      commonName: this.data.user.firstName + ' ' + this.data.user.lastName,
      organisationalUnit: this.certificateRequestForm.value.organisationalUnit ?? '',
      organisation: this.certificateRequestForm.value.organisation ?? '',
      location: this.certificateRequestForm.value.location ?? '',
      state: this.certificateRequestForm.value.state ?? '',
      country: this.certificateRequestForm.value.country ?? '',
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
