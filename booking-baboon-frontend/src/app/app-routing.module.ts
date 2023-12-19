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
  AccommodationModificationPageComponent
} from "./layout/accommodations/pages/accommodation-modification-page/accommodation-modification-page.component";
import {
  AccommodationModificationDetailsPageComponent
} from "./layout/accommodations/pages/accommodation-modification-details-page/accommodation-modification-details-page.component";
import {
  ReservationRequestPageComponent
} from "./layout/Reservations/reservation-request-page/reservation-request-page.component";
import {
  AccommodationCreationPageComponent
} from "./layout/accommodations/pages/accommodation-creation-page/accommodation-creation-page.component";
import {
  AccommodationAvailablePeriodComponent
} from "./layout/accommodations/components/accommodation-available-period/accommodation-available-period.component";
import {
  AccommodationAvailablePeriodPageComponent
} from "./layout/accommodations/pages/accommodation-available-period-page/accommodation-available-period-page.component";
import {
  EditAccommodationPageComponent
} from "./layout/accommodations/pages/edit-accommodation-page/edit-accommodation-page.component";
import {LoginGuard} from "./infrastructure/auth/guard/login.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/accommodations',
    pathMatch: 'full'
  },
  {
    component: LoginComponent,
    path:"login",
    canActivate: [LoginGuard]
  },
  {
    component: RegisterComponent,
    path:"register",
    canActivate: [LoginGuard]
  },
  {
    component: AccommodationsPageComponent,
    path:"accommodations"
  },
  {
    component: AccommodationDetailsPageComponent,
    path:"accommodations/:accommodationId"},
  {
    component: ProfileComponent,
    path:"profile/:userEmail",
    canActivate: [AuthGuard],
    data: {role: ['ADMIN', 'GUEST', 'HOST']}
  },
  {
    component: ActivationComponent,
    path:"users/activate"
  },
  {
    component: HostProfilePageComponent,
    path:"host/profile/:hostId"
  },
  {
    component: HostAccommodationsListComponent,
    path:"host/accommodations",
    canActivate: [AuthGuard],
    data: {role: ['HOST']}
  },
  {
    component: AccommodationModificationPageComponent,
    path:"accommodation-modifications",
    canActivate: [AuthGuard],
    data: {role: ['ADMIN']}
  },
  {
    component: AccommodationModificationDetailsPageComponent,
    path:"accommodation-modifications/:accommodationModificationId",
    canActivate: [AuthGuard],
    data: {role: ['ADMIN']}
  },
  {
    component: ReservationRequestPageComponent,
    path:"accommodations/:accommodationId/reserve",
    canActivate: [AuthGuard],
    data: {role: ['GUEST']}
  },
  {
    component: AccommodationCreationPageComponent,
    path: "host/accommodations/create",
    canActivate: [AuthGuard],
    data: {role: ['HOST']}
  },
  {
    component: AccommodationAvailablePeriodPageComponent,
    path: 'accommodations/periods/:id',
    canActivate: [AuthGuard],
    data: {role: ['HOST']}
  },
  {
    component: EditAccommodationPageComponent,
    path: 'accommodations/:accommodationId/edit',
    canActivate: [AuthGuard],
    data: {role: ['HOST']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
