import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
      RouterModule
    ]
})
export class LayoutModule { }
