import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriversComponent } from './drivers.component';
import { CreateDriversComponent } from './create-drivers/create-drivers.component';
import { DetailsDriversComponent } from './details-drivers/details-drivers.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { AssignVehicleComponent } from './assign-vehicle/assign-vehicle.component';
import { AssignedVehicleListComponent } from './assigned-vehicle-list/assigned-vehicle-list.component';

const routes: Routes = [
  { path: '', component: DriversComponent,
  children: [
    { path: 'create', component: CreateDriversComponent },
    { path: 'details/:id', component: DetailsDriversComponent },
    { path: 'list', component: ListDriversComponent },
    { path: 'assign/:id', component: AssignVehicleComponent },
    { path: 'assignedList', component: AssignedVehicleListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
