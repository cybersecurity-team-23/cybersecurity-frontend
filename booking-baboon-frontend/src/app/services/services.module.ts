import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
  ],
})
export class ServicesModule { }
