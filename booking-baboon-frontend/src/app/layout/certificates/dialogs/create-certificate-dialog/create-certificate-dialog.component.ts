import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateService} from "../../../../shared/certificate.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateCertificate} from "../../../../shared/models/create-certificate.model";
import {SharedService} from "../../../../shared/shared.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-certificate-dialog',
  templateUrl: './create-certificate-dialog.component.html',
  styleUrls: ['./create-certificate-dialog.component.css']
})
export class CreateCertificateDialogComponent {
  certificateType: string | null = null;

  certificateTypeForm: FormGroup<{
    certificateType: FormControl<string | null>,
  }> = new FormGroup<{
    certificateType: FormControl<string | null>,
  }>({
    certificateType: new FormControl<string | null>(this.certificateType, [Validators.required])
  })

  subjectInfoForm: FormGroup<{
    email: FormControl<string | null>,
    commonName: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    organisation: FormControl<string | null>,
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>,
  }> = new FormGroup<{
    email: FormControl<string | null>,
    commonName: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    organisation: FormControl<string | null>,
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>,
  }>({
    email: new FormControl<string | null>('', [Validators.required]),
    commonName: new FormControl<string | null>('', [Validators.required]),
    organisationalUnit: new FormControl<string | null>('', [Validators.required]),
    organisation: new FormControl<string | null>('', [Validators.required]),
    location: new FormControl<string | null>('', [Validators.required]),
    state: new FormControl<string | null>('', [Validators.required]),
    country: new FormControl<string | null>('', [Validators.required]),
  });

  domainForm: FormGroup<{
    domain: FormControl<string | null>,
  }> = new FormGroup<{
    domain: FormControl<string | null>,
  }>({
    domain: new FormControl<string | null>('', [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { caAlias: string },
              public dialogRef: MatDialogRef<CreateCertificateDialogComponent>,
              private certificateService: CertificateService, private sharedService: SharedService) { }

  protected getRequiredErrorMessage(): string {
    return "This field is required";
  }

  protected areFormsValid(): boolean {
    return this.certificateTypeForm.valid &&
      this.subjectInfoForm.valid &&
      ((this.certificateType == 'HTTPS' && this.domainForm.valid) || this.certificateType != 'HTTPS');
  }

  protected createCertificate(): void {
    if (!this.areFormsValid())
      return;

    const certificate: CreateCertificate = {
      certificateType: this.certificateType ?? '',
      caAlias: this.data.caAlias,
      subject: {
        email: this.subjectInfoForm.value.email ?? '',
        commonName: this.subjectInfoForm.value.commonName ?? '',
        organisationalUnit: this.subjectInfoForm.value.organisationalUnit ?? '',
        organisation: this.subjectInfoForm.value.organisation ?? '',
        location: this.subjectInfoForm.value.location ?? '',
        state: this.subjectInfoForm.value.state ?? '',
        country: this.subjectInfoForm.value.country ?? '',
      },
      domain: this.domainForm.value.domain ?? null,
    };

    this.certificateService.create(certificate).subscribe({
      next: (): void => this.dialogRef.close(true),
      error: (error: HttpErrorResponse): void => {
        if (error)
          this.sharedService.openSnack(error.error.message);
        else
          this.sharedService.openSnack('Error reaching the server.');
      },
    });
  }
}
