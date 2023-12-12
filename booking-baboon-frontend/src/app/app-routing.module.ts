import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./infrastructure/auth/login/login.component";
import {RegisterComponent} from "./layout/authentication/pages/register/register.component";
import {
  AccommodationDetailsComponent
} from "./layout/accommodations/components/accommodation-details/accommodation-details.component";
import {
  AccommodationDetailsPageComponent
} from "./layout/accommodations/pages/accommodation-details-page/accommodation-details-page.component";
import {AccommodationsPageComponent} from "./layout/accommodations/pages/accommodations-page/accommodations-page.component";
import {ProfileComponent} from "./layout/authentication/pages/profile/profile.component";
import {AuthGuard} from "./infrastructure/auth/guard/auth.guard";
import {ActivationComponent} from "./layout/authentication/pages/activation/activation.component";
import {HostProfilePageComponent} from "./layout/host/host-profile-page/host-profile-page.component";
import {
  HostAccommodationsListComponent
} from "./layout/accommodations/pages/host-accommodations-list/host-accommodations-list.component";
import {
  ReservationRequestPageComponent
} from "./layout/Reservations/reservation-request-page/reservation-request-page.component";
import {
  AccommodationCreationPageComponent
} from "./layout/accommodations/pages/accommodation-creation-page/accommodation-creation-page.component";


const routes: Routes = [
  {component: AccommodationsPageComponent, path:"accommodations"},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: AccommodationDetailsPageComponent, path:"accommodations/:accommodationId"},
  {component: ProfileComponent, path:"profile/:userEmail", canActivate: [AuthGuard],
    data: {role: ['ADMIN', 'GUEST', 'HOST']}},
  { path: '', redirectTo: '/accommodations', pathMatch: 'full' },
  {component: ActivationComponent, path:"users/activate"},
  {component: HostProfilePageComponent, path:"host/:hostId"},
  {component: HostAccommodationsListComponent, path:"host/accommodations"},
  {component: ReservationRequestPageComponent, path:"accommodations/:accommodationId/reserve"},
  {component: AccommodationCreationPageComponent, path: "host/accommodations/create"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
