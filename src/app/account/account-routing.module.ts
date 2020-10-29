import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { SetNewPwdForDriverComponent } from './set-new-pwd-for-driver/set-new-pwd-for-driver.component';


const routes: Routes = [
  { path: '', component: AccountLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'resetPassword', component: ResetPasswordComponent },
        { path: 'setNewPassword', component: SetNewPasswordComponent },
        { path: 'invite', component: SetNewPwdForDriverComponent }
      ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
