import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from "../layout/layout.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Interceptor} from "../infrastructure/auth/interceptor";



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
