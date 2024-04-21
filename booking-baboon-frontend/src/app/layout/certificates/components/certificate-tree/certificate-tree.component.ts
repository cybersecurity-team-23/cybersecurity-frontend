import {Component, Input} from '@angular/core';
import {CertificateNode} from "../../models/certificate-node.model";
import {GenericYesNoDialogComponent} from "../../dialogs/generic-yes-no-dialog/generic-yes-no-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-certificate-tree',
  templateUrl: './certificate-tree.component.html',
  styleUrls: ['./certificate-tree.component.css']
})
export class CertificateTreeComponent {
  @Input() certificateNodes: CertificateNode[] | undefined;
  protected isPressed: boolean[] = [];

  constructor(private dialog: MatDialog) { }

  protected validate(index: number): void { }
  protected add(index: number): void { }
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
}
