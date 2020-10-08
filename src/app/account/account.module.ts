import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SiteFrameworkModule } from '../site-framework/site-framework.module';


@NgModule({
  declarations: [
    AccountLayoutComponent,
    LoginComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SiteFrameworkModule
  ]
})
export class AccountModule { }
