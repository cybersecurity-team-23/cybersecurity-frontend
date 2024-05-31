import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CertificateService} from "../../services/certificate.service";
import {SharedService} from "../../../../shared/shared.service";
import {CreateCertificate} from "../../../../shared/models/create-certificate.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-company-certificate-dialog',
  templateUrl: './create-company-certificate-dialog.component.html',
  styleUrls: ['./create-company-certificate-dialog.component.css']
})
export class CreateCompanyCertificateDialogComponent {
  companyInfoForm: FormGroup<{
    companyEmail: FormControl<string | null>,
    commonName: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    organisation: FormControl<string | null>,
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>
  }> = new FormGroup<{
    companyEmail: FormControl<string | null>,
    commonName: FormControl<string | null>,
    organisationalUnit: FormControl<string | null>,
    organisation: FormControl<string | null>,
    location: FormControl<string | null>,
    state: FormControl<string | null>,
    country: FormControl<string | null>
  }>({
    companyEmail: new FormControl<string | null>('', [Validators.required]),
    commonName: new FormControl<string | null>('', [Validators.required]),
    organisationalUnit: new FormControl<string | null>('', [Validators.required]),
    organisation: new FormControl<string | null>('', [Validators.required]),
    location: new FormControl<string | null>('', [Validators.required]),
    state: new FormControl<string | null>('', [Validators.required]),
    country: new FormControl<string | null>('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { rootCaAlias: string },
              public dialogRef: MatDialogRef<CreateCompanyCertificateDialogComponent>,
              private certificateService: CertificateService, private sharedService: SharedService) { }

  protected getRequiredErrorMessage(): string {
    return "This field is required";
  }

  protected createCompanyCertificate(): void {
    if (!this.companyInfoForm.valid)
      return;

    const certificate: CreateCertificate = {
      certificateType: 'Intermediate',
      caAlias: this.data.rootCaAlias,
      subject: {
        email: this.companyInfoForm.value.companyEmail ?? '',
        commonName: this.companyInfoForm.value.commonName ?? '',
        organisationalUnit: this.companyInfoForm.value.organisationalUnit ?? '',
        organisation: this.companyInfoForm.value.organisation ?? '',
        location: this.companyInfoForm.value.location ?? '',
        state: this.companyInfoForm.value.state ?? '',
        country: this.companyInfoForm.value.country ?? '',
      },
      domain: null,
    };

    this.certificateService.create(certificate).subscribe({
      next: (): void => this.dialogRef.close(true),
      error: (error: HttpErrorResponse): void => {
        if (error)

          // TODO: Print error message

          this.sharedService.openSnack('');
        else
          this.sharedService.openSnack('Error reaching the server.');
      },
    });
  }
}
