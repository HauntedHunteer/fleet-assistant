import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateUserDataComponent } from './user-data/create-user-data/create-user-data.component';
import { UpdateUserDataComponent } from './user-data/update-user-data/update-user-data.component';
import { DetailsUserDataComponent } from './user-data/details-user-data/details-user-data.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CreateVehicleComponent } from './vehicle/create-vehicle/create-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { DetailsVehicleComponent } from './vehicle/details-vehicle/details-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
      children: [
        { path: 'userData', component: UserDataComponent,
          children: [
            { path: 'create', component: CreateUserDataComponent },
            { path: 'update', component: UpdateUserDataComponent },
            { path: 'details', component: DetailsUserDataComponent }
          ]
        },
        { path: 'vehicle', component: VehicleComponent,
          children: [
            { path: 'create', component: CreateVehicleComponent },
            { path: 'update/:id', component: UpdateVehicleComponent },
            { path: 'details/:id', component: DetailsVehicleComponent },
            { path: 'list', component: ListVehicleComponent }
          ]
        }
      ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
