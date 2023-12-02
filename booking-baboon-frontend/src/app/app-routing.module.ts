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
import {AccountComponent} from "./layout/authentication/pages/account/account.component";
import {AuthGuard} from "./infrastructure/auth/guard/auth.guard";

const routes: Routes = [
  {component: AccommodationsPageComponent, path:"accommodations"},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: AccommodationDetailsPageComponent, path:"accommodations/:accommodationId"},
  {component: AccountComponent, path:"account/:userId", canActivate: [AuthGuard],
    data: {role: ['ADMIN', 'GUEST', 'HOST']}},
  { path: '', redirectTo: '/accommodations', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
