import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SiteFrameworkModule } from '../site-framework/site-framework.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { SetNewPwdForDriverComponent } from './set-new-pwd-for-driver/set-new-pwd-for-driver.component';


@NgModule({
  declarations: [
    AccountLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    SetNewPwdForDriverComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SiteFrameworkModule
  ]
})
export class AccountModule { }
