import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbars/navbar/navbar.component";
import {LoginComponent} from "./authentication/login/login.component";
import {NavbarHostComponent} from "./navbars/navbar-host/navbar-host.component";
import {NavbarGuestComponent} from "./navbars/navbar-guest/navbar-guest.component";
import {NavbarAdminComponent} from "./navbars/navbar-admin/navbar-admin.component";
import {NavbarUnauthorizedComponent} from "./navbars/navbar-unauthorized/navbar-unauthorized.component";
import {
  AccommodationsSearchBarComponent
} from "./accommodations/search/components/accommodations-search-bar/accommodations-search-bar.component";
import {
  AccommodationCardsComponent
} from "./accommodations/search/components/accommodation-cards/accommodation-cards.component";
import {AccommodationCardComponent} from "./accommodations/search/components/accommodation-card/accommodation-card.component";
import {
  AccommodationDetailsComponent
} from "./accommodations/search/components/accommodation-details/accommodation-details.component";
import {ImageCarouselComponent} from "./accommodations/search/components/image-carousel/image-carousel.component";
import {
  AccommodationDetailsPageComponent
} from "./accommodations/search/pages/accommodation-details-page/accommodation-details-page.component";
import {AccommodationsPageComponent} from "./accommodations/search/pages/accommodations-page/accommodations-page.component";
import {
  AccommodationFilterComponent
} from "./accommodations/search/components/accommodation-filter/accommodation-filter.component";
import {ProfileComponent} from "./users/pages/profile/profile.component";
import {ActivationComponent} from "./authentication/activation/activation.component";
import {HostProfileComponent} from "./users/components/host-profile/host-profile.component";
import {HostProfilePageComponent} from "./users/pages/host-profile-page/host-profile-page.component";
import {ReviewCardComponent} from "./reviews/review-card/review-card.component";
import {ReviewCardsComponent} from "./reviews/review-cards/review-cards.component";
import {ReviewsDialogComponent} from "./reviews/reviews-dialog/reviews-dialog.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";
import { HostAccommodationsListComponent } from './accommodations/host/pages/host-accommodations-list/host-accommodations-list.component';
import { HostAccommodationCardComponent } from './accommodations/host/components/host-accommodation-card/host-accommodation-card.component';
import { HostAccommodationCardsComponent } from './accommodations/host/components/host-accommodation-cards/host-accommodation-cards.component';
import { AccommodationModificationPageComponent } from './accommodations/modification/pages/accommodation-modification-page/accommodation-modification-page.component';
import { AccommodationModificationCardComponent } from './accommodations/modification/components/accommodation-modification-card/accommodation-modification-card.component';
import { AccommodationModificationCardsComponent } from './accommodations/modification/components/accommodation-modification-cards/accommodation-modification-cards.component';
import { AccommodationModificationDetailsComponent } from './accommodations/modification/components/accommodation-modification-details/accommodation-modification-details.component';
import { AccommodationModificationDetailsPageComponent } from './accommodations/modification/pages/accommodation-modification-details-page/accommodation-modification-details-page.component';
import { ReservationRequestPageComponent } from './reservations/reservation-request-page/reservation-request-page.component';
import { ReservationRequestComponent } from './reservations/reservation-request/reservation-request.component';
import { AccommodationCreationPageComponent } from './accommodations/host/pages/accommodation-creation-page/accommodation-creation-page.component';
import { AccommodationCreationComponent } from './accommodations/host/components/accommodation-creation/accommodation-creation.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { AccommodationAvailablePeriodComponent } from './accommodations/host/components/accommodation-available-period/accommodation-available-period.component';
import { AccommodationAvailablePeriodPageComponent } from './accommodations/host/pages/accommodation-available-period-page/accommodation-available-period-page.component';
import {EditAccommodationComponent} from "./accommodations/host/components/edit-accommodation/edit-accommodation.component";
import {
  EditAccommodationPageComponent
} from "./accommodations/host/pages/edit-accommodation-page/edit-accommodation-page.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RegisterComponent} from "./authentication/register/register.component";
import {HttpClientModule} from "@angular/common/http";
import { HostReviewFormComponent } from './reviews/host-review-form/host-review-form.component';
import { StarRatingInputComponent } from './reviews/star-rating-input/star-rating-input.component';
import { GuestReservationsPageComponent } from './reservations/guest/guest-reservations-page/guest-reservations-page.component';
import { GuestReservationsComponent } from './reservations/guest/guest-reservations/guest-reservations.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { MonthlySummaryDialogComponent } from './summaries/monthly-summary-dialog/monthly-summary-dialog.component';
import { ReservationsChartComponent } from './summaries/reservations-chart/reservations-chart.component';
import { ProfitChartComponent } from './summaries/profit-chart/profit-chart.component';



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
    HostProfileComponent,
    HostProfilePageComponent,
    ReviewCardComponent,
    ReviewCardsComponent,
    ReviewsDialogComponent,
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
    AccommodationCreationComponent,
    AccommodationAvailablePeriodComponent,
    AccommodationAvailablePeriodPageComponent,
    EditAccommodationComponent,
    EditAccommodationPageComponent,
    HostReviewFormComponent,
    StarRatingInputComponent,
    GuestReservationsPageComponent,
    GuestReservationsComponent,
    MonthlySummaryDialogComponent,
    ReservationsChartComponent,
    ProfitChartComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
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
    MatAutocompleteModule,
    MatTooltipModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule
  ]
})
export class LayoutModule { }
