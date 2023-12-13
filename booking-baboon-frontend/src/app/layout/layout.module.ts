import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./Navbars/navbar/navbar.component";
import {LoginComponent} from "../infrastructure/auth/login/login.component";
import {NavbarHostComponent} from "./Navbars/navbar-host/navbar-host.component";
import {NavbarGuestComponent} from "./Navbars/navbar-guest/navbar-guest.component";
import {RegisterComponent} from "./authentication/pages/register/register.component";
import {NavbarAdminComponent} from "./Navbars/navbar-admin/navbar-admin.component";
import {NavbarUnauthorizedComponent} from "./Navbars/navbar-unauthorized/navbar-unauthorized.component";
import {
  AccommodationsSearchBarComponent
} from "./accommodations/components/accommodations-search-bar/accommodations-search-bar.component";
import {
  AccommodationCardsComponent
} from "./accommodations/components/accommodation-cards/accommodation-cards.component";
import {AccommodationCardComponent} from "./accommodations/components/accommodation-card/accommodation-card.component";
import {
  AccommodationDetailsComponent
} from "./accommodations/components/accommodation-details/accommodation-details.component";
import {ImageCarouselComponent} from "./accommodations/components/image-carousel/image-carousel.component";
import {
  AccommodationDetailsPageComponent
} from "./accommodations/pages/accommodation-details-page/accommodation-details-page.component";
import {AccommodationsPageComponent} from "./accommodations/pages/accommodations-page/accommodations-page.component";
import {
  AccommodationFilterComponent
} from "./accommodations/components/accommodation-filter/accommodation-filter.component";
import {ProfileComponent} from "./authentication/pages/profile/profile.component";
import {ActivationComponent} from "./authentication/pages/activation/activation.component";
import {MapComponent} from "./map/map/map.component";
import {MapDialogComponent} from "./map/map-dialog/map-dialog.component";
import {HostProfileComponent} from "./host/host-profile/host-profile.component";
import {HostProfilePageComponent} from "./host/host-profile-page/host-profile-page.component";
import {ReviewCardComponent} from "./Reviews/review-card/review-card.component";
import {ReviewCardsComponent} from "./Reviews/review-cards/review-cards.component";
import {ReviewsDialogComponent} from "./Reviews/reviews-dialog/reviews-dialog.component";
import {ConfirmComponent} from "./dialogs/confirm/confirm.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";
import { HostAccommodationsListComponent } from './accommodations/pages/host-accommodations-list/host-accommodations-list.component';
import { HostAccommodationCardComponent } from './accommodations/components/host-accommodation-card/host-accommodation-card.component';
import { HostAccommodationCardsComponent } from './accommodations/components/host-accommodation-cards/host-accommodation-cards.component';
import { AccommodationModificationPageComponent } from './accommodations/pages/accommodation-modification-page/accommodation-modification-page.component';
import { AccommodationModificationCardComponent } from './accommodations/components/accommodation-modification-card/accommodation-modification-card.component';
import { AccommodationModificationCardsComponent } from './accommodations/components/accommodation-modification-cards/accommodation-modification-cards.component';
import { AccommodationModificationDetailsComponent } from './accommodations/components/accommodation-modification-details/accommodation-modification-details.component';
import { AccommodationModificationDetailsPageComponent } from './accommodations/pages/accommodation-modification-details-page/accommodation-modification-details-page.component';
import { ReservationRequestPageComponent } from './Reservations/reservation-request-page/reservation-request-page.component';
import { ReservationRequestComponent } from './Reservations/reservation-request/reservation-request.component';
import { AccommodationCreationPageComponent } from './accommodations/pages/accommodation-creation-page/accommodation-creation-page.component';
import { AccommodationCreationComponent } from './accommodations/components/accommodation-creation/accommodation-creation.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";



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
    AccommodationFilterComponent,
    ProfileComponent,
    ActivationComponent,
    MapComponent,
    MapDialogComponent,
    HostProfileComponent,
    HostProfilePageComponent,
    ReviewCardComponent,
    ReviewCardsComponent,
    ReviewsDialogComponent,
    ConfirmComponent,
    HostAccommodationsListComponent,
    HostAccommodationCardComponent,
    HostAccommodationCardsComponent,
    AccommodationModificationPageComponent,
    AccommodationModificationCardComponent,
    AccommodationModificationCardsComponent,
    AccommodationModificationDetailsComponent,
    AccommodationModificationDetailsPageComponent,
    ReservationRequestPageComponent,
    ReservationRequestComponent,
    AccommodationCreationPageComponent,
    AccommodationCreationComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ActivationComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
        RouterModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        SharedModule,
        MatAutocompleteModule
    ]
})
export class LayoutModule { }
