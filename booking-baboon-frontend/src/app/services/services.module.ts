import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {AuthenticationService} from "../layout/authentication/services/authentication.service";
import {AccommodationService} from "./accommodation/accommodation.service";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    HttpClientModule,
  ],
  exports: [
  ],
})
export class ServicesModule { }
