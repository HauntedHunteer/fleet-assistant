import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateUserDataComponent } from './user-data/create-user-data/create-user-data.component';
import { UpdateUserDataComponent } from './user-data/update-user-data/update-user-data.component';
import { DetailsUserDataComponent } from './user-data/details-user-data/details-user-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
      children: [
        { path: 'userData', component: UserDataComponent,
          children: [
            { path: 'create', component: CreateUserDataComponent },
            { path: 'update', component: UpdateUserDataComponent },
            { path: 'details', component: DetailsUserDataComponent }
          ]},
      ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
