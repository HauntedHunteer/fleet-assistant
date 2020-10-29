import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DriversRoutingModule } from './drivers-routing.module';
import { SiteFrameworkModule } from '../../site-framework/site-framework.module';
import { DriversComponent } from './drivers.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DetailsDriversComponent } from './details-drivers/details-drivers.component';
import { CreateDriversComponent } from './create-drivers/create-drivers.component';
import { AssignVehicleComponent } from './assign-vehicle/assign-vehicle.component';
import { AssignedVehicleListComponent } from './assigned-vehicle-list/assigned-vehicle-list.component';

@NgModule({
  declarations: [
    DriversComponent,
    ListDriversComponent,
    DetailsDriversComponent,
    CreateDriversComponent,
    AssignVehicleComponent,
    AssignedVehicleListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DriversRoutingModule,
    SiteFrameworkModule
  ]
})
export class DriversModule { }
