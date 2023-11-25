import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {LoginComponent} from "./layout/login/login.component";
import {RegisterComponent} from "./layout/register/register.component";
import {GuestComponent} from "./layout/guest/guest.component";
import {HostComponent} from "./layout/host/host.component";
import {AdminComponent} from "./layout/admin/admin.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: GuestComponent, path:"guest"},
  {component: HostComponent, path:"host"},
  {component: AdminComponent, path:"admin"},
  {path: '', redirectTo: '/home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
