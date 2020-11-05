import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent,
    children: [
      { path: 'details/:id', component: DetailsUserComponent},
      { path: 'list', component: ListUserComponent }
    ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
