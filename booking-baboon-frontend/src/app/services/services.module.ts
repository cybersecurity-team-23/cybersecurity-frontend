import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {AuthenticationService} from "./authentication.service";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
  ]
})
export class ServicesModule { }
