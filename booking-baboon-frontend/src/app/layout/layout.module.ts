import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Navbars/navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarGuestComponent } from './Navbars/navbar-guest/navbar-guest.component';
import { NavbarHostComponent } from './Navbars/navbar-host/navbar-host.component';
import { NavbarAdminComponent } from './Navbars/navbar-admin/navbar-admin.component';
import { NavbarUnauthorizedComponent } from './Navbars/navbar-unauthorized/navbar-unauthorized.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { GuestComponent } from './guest/guest.component';
import { AdminComponent } from './admin/admin.component';
import { HostComponent } from './host/host.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarGuestComponent,
    NavbarHostComponent,
    NavbarAdminComponent,
    NavbarUnauthorizedComponent,
    GuestComponent,
    AdminComponent,
    HostComponent
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
    RouterModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
