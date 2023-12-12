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
  {component: AccommodationModificationPageComponent, path:"accommodation-modifications"},
  {component: AccommodationModificationDetailsPageComponent, path:"accommodation-modifications/:accommodationModificationId"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
