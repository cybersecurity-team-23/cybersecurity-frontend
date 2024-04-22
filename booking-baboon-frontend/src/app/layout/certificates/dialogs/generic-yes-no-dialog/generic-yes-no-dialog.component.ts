import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-generic-yes-no-dialog',
  templateUrl: './generic-yes-no-dialog.component.html',
  styleUrls: ['./generic-yes-no-dialog.component.css']
})
export class GenericYesNoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
