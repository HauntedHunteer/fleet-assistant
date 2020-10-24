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
import { ChangePasswordComponent } from './user-data/change-password/change-password.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CreateVehicleComponent } from './vehicle/create-vehicle/create-vehicle.component';
import { DetailsVehicleComponent } from './vehicle/details-vehicle/details-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { InspectionComponent } from './inspection/inspection.component';
import { CreateInspectionComponent } from './inspection/create-inspection/create-inspection.component';
import { DetailsInspectionComponent } from './inspection/details-inspection/details-inspection.component';
import { UpdateInspectionComponent } from './inspection/update-inspection/update-inspection.component';
import { ListInspectionComponent } from './inspection/list-inspection/list-inspection.component';
import { CreateInsuranceComponent } from './insurance/create-insurance/create-insurance.component';
import { DetailsInsuranceComponent } from './insurance/details-insurance/details-insurance.component';
import { UpdateInsuranceComponent } from './insurance/update-insurance/update-insurance.component';
import { ListInsuranceComponent } from './insurance/list-insurance/list-insurance.component';
import { RepairComponent } from './repair/repair.component';
import { CreateRepairComponent } from './repair/create-repair/create-repair.component';
import { DetailsRepairComponent } from './repair/details-repair/details-repair.component';
import { ListRepairComponent } from './repair/list-repair/list-repair.component';
import { UpdateRepairComponent } from './repair/update-repair/update-repair.component';
import { RefuelingComponent } from './refueling/refueling.component';
import { CreateRefuelingComponent } from './refueling/create-refueling/create-refueling.component';
import { DetailsRefuelingComponent } from './refueling/details-refueling/details-refueling.component';
import { ListRefuelingComponent } from './refueling/list-refueling/list-refueling.component';
import { UpdateRefuelingComponent } from './refueling/update-refueling/update-refueling.component';
import { UseComponent } from './use/use.component';
import { CreateUseComponent } from './use/create-use/create-use.component';
import { DetailsUseComponent } from './use/details-use/details-use.component';
import { ListUseComponent } from './use/list-use/list-use.component';
import { UpdateUseComponent } from './use/update-use/update-use.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UserDataComponent,
    CreateUserDataComponent,
    UpdateUserDataComponent,
    DetailsUserDataComponent,
    ChangePasswordComponent,
    CreateVehicleComponent,
    DetailsVehicleComponent,
    UpdateVehicleComponent,
    ListVehicleComponent,
    VehicleComponent,
    InsuranceComponent,
    InspectionComponent,
    CreateInspectionComponent,
    DetailsInspectionComponent,
    UpdateInspectionComponent,
    ListInspectionComponent,
    CreateInsuranceComponent,
    DetailsInsuranceComponent,
    UpdateInsuranceComponent,
    ListInsuranceComponent,
    RepairComponent,
    CreateRepairComponent,
    DetailsRepairComponent,
    ListRepairComponent,
    UpdateRepairComponent,
    RefuelingComponent,
    CreateRefuelingComponent,
    DetailsRefuelingComponent,
    ListRefuelingComponent,
    UpdateRefuelingComponent,
    UseComponent,
    CreateUseComponent,
    DetailsUseComponent,
    ListUseComponent,
    UpdateUseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SiteFrameworkModule
  ]
})
export class DashboardModule { }
