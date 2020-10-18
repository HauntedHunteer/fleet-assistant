import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SiteFrameworkModule } from '../site-framework/site-framework.module';
import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateUserDataComponent } from './user-data/create-user-data/create-user-data.component';
import { UpdateUserDataComponent } from './user-data/update-user-data/update-user-data.component';
import { DetailsUserDataComponent } from './user-data/details-user-data/details-user-data.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CreateVehicleComponent } from './vehicle/create-vehicle/create-vehicle.component';
import { DetailsVehicleComponent } from './vehicle/details-vehicle/details-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UserDataComponent,
    CreateUserDataComponent,
    UpdateUserDataComponent,
    DetailsUserDataComponent,
    CreateVehicleComponent,
    DetailsVehicleComponent,
    UpdateVehicleComponent,
    ListVehicleComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SiteFrameworkModule
  ]
})
export class DashboardModule { }
