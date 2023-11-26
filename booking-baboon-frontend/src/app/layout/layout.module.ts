import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Navbars/navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarGuestComponent } from './Navbars/navbar-guest/navbar-guest.component';
import { NavbarHostComponent } from './Navbars/navbar-host/navbar-host.component';
import { NavbarAdminComponent } from './Navbars/navbar-admin/navbar-admin.component';
import { NavbarUnauthorizedComponent } from './Navbars/navbar-unauthorized/navbar-unauthorized.component';
import { AccommodationsSearchBarComponent } from './accommodations/accommodations-search-bar/accommodations-search-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AccommodationCardsComponent } from './accommodations/accommodation-cards/accommodation-cards.component';
import { AccommodationCardComponent } from './accommodations/accommodation-card/accommodation-card.component';
import { AccommodationDetailsComponent } from './accommodations/accommodation-details/accommodation-details.component';
import { ImageCarouselComponent } from './accommodations/image-carousel/image-carousel.component';
import { AccommodationDetailsPageComponent } from './accommodation-details-page/accommodation-details-page.component';
import { AccommodationsPageComponent } from './accommodations-page/accommodations-page.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NavbarGuestComponent,
    NavbarHostComponent,
    NavbarAdminComponent,
    NavbarUnauthorizedComponent,
    AccommodationsSearchBarComponent,
    AccommodationCardsComponent,
    AccommodationCardComponent,
    AccommodationDetailsComponent,
    ImageCarouselComponent,
    AccommodationDetailsPageComponent,
    AccommodationsPageComponent,
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class LayoutModule { }
