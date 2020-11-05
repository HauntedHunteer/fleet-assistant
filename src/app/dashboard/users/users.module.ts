import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUserComponent } from './list-user/list-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import {SiteFrameworkModule} from '../../site-framework/site-framework.module';


@NgModule({
  declarations: [
    UsersComponent,
    ListUserComponent,
    DetailsUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SiteFrameworkModule
  ]
})
export class UsersModule { }
