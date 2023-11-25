import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {LoginComponent} from "./layout/login/login.component";
import {RegisterComponent} from "./layout/register/register.component";
import {AccountComponent} from "./layout/account/account.component";

const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: AccountComponent, path:"account"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
