import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CertificateNode} from "../../models/certificate-node.model";
import {GenericYesNoDialogComponent} from "../../dialogs/generic-yes-no-dialog/generic-yes-no-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CertificateService} from "../../services/certificate.service";
import {CertificateValidity} from "../../models/certificate-validity.model";
import {SharedService} from "../../../../shared/shared.service";
import {
  CreateCertificateDialogComponent
} from "../../dialogs/create-certificate-dialog/create-certificate-dialog.component";

@Component({
  selector: 'app-certificate-tree',
  templateUrl: './certificate-tree.component.html',
  styleUrls: ['./certificate-tree.component.css']
})
export class CertificateTreeComponent {
  @Input() certificateTree: CertificateNode[] | undefined;
  protected isPressed: boolean[] = [];

  @Output() certificateCreated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dialog: MatDialog, private certificateService: CertificateService,
              private sharedService: SharedService) { }

  protected validate(index: number): void {
    let certificate: CertificateNode | undefined = this.certificateTree?.at(index);
    this.certificateService.isValid(certificate?.alias() ?? '0').subscribe({
      next: (certificateValidity: CertificateValidity): void => {
        let issuerEmail: string = certificate?.issuer.email ?? '';
        let certificateSerialNumber: string = certificate?.serialNumber ?? '';
        if (certificateValidity.valid)
          this
            .sharedService
            .openSnack(
              `Certificate from issuer whose email is ${issuerEmail},
              under serial number ${certificateSerialNumber} is valid.`
            )
        else
          this
            .sharedService
            .openSnack(
              `Certificate from issuer whose email is ${issuerEmail},
              under serial number ${certificateSerialNumber} is valid.`
            )
      },
      error: (): void => this.sharedService.openSnack('Error reaching the server.'),
    });
  }

  protected openCreateCertificateDialog(index: number, enterAnimationDuration: string,
                                                 exitAnimationDuration: string): void {
    this.dialog.open(CreateCertificateDialogComponent, {
      data: {
        caAlias: this.certificateTree?.at(index)?.alias()
      },
      enterAnimationDuration,
      exitAnimationDuration,
    })
      .afterClosed()
      .subscribe({
        next: dialogResult => {
          if (dialogResult)
            this.certificateCreated.emit();
        }
      });
  }

  protected delete(index: number): void { }

  protected openDeleteCertificateDialog(index: number, enterAnimationDuration: string,
                                        exitAnimationDuration: string): void {
    this.dialog.open(GenericYesNoDialogComponent, {
      data: {
        message: "Are you sure you want to delete this certificate?"
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

        // TODO: Add reaction to delete confirmation

      })
  }

  protected propagateEmit() {
    this.certificateCreated.emit();
  }
}
