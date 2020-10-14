import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateUserDataComponent } from './user-data/create-user-data/create-user-data.component';
import { UpdateUserDataComponent } from './user-data/update-user-data/update-user-data.component';
import { DetailsUserDataComponent } from './user-data/details-user-data/details-user-data.component';
import { SiteFrameworkModule } from '../site-framework/site-framework.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UserDataComponent,
    CreateUserDataComponent,
    UpdateUserDataComponent,
    DetailsUserDataComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SiteFrameworkModule
  ]
})
export class DashboardModule { }
