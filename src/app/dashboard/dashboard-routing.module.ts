import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../_helpers/admin.guard';
import { SuperuserGuard } from '../_helpers/superuser.guard';
import { UserGuard } from '../_helpers/user.guard';

import { DashboardComponent } from './dashboard.component';
import { UserDataComponent } from './user-data/user-data.component';
import { CreateUserDataComponent } from './user-data/create-user-data/create-user-data.component';
import { UpdateUserDataComponent } from './user-data/update-user-data/update-user-data.component';
import { DetailsUserDataComponent } from './user-data/details-user-data/details-user-data.component';
import { ChangePasswordComponent } from './user-data/change-password/change-password.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CreateVehicleComponent } from './vehicle/create-vehicle/create-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { DetailsVehicleComponent } from './vehicle/details-vehicle/details-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';
import { InspectionComponent } from './inspection/inspection.component';
import { CreateInspectionComponent } from './inspection/create-inspection/create-inspection.component';
import { UpdateInspectionComponent } from './inspection/update-inspection/update-inspection.component';
import { DetailsInspectionComponent } from './inspection/details-inspection/details-inspection.component';
import { ListInspectionComponent } from './inspection/list-inspection/list-inspection.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { CreateInsuranceComponent } from './insurance/create-insurance/create-insurance.component';
import { UpdateInsuranceComponent } from './insurance/update-insurance/update-insurance.component';
import { DetailsInsuranceComponent } from './insurance/details-insurance/details-insurance.component';
import { ListInsuranceComponent } from './insurance/list-insurance/list-insurance.component';
import { RepairComponent } from './repair/repair.component';
import { CreateRepairComponent } from './repair/create-repair/create-repair.component';
import { UpdateRepairComponent } from './repair/update-repair/update-repair.component';
import { DetailsRepairComponent } from './repair/details-repair/details-repair.component';
import { ListRepairComponent } from './repair/list-repair/list-repair.component';
import { RefuelingComponent } from './refueling/refueling.component';
import { CreateRefuelingComponent } from './refueling/create-refueling/create-refueling.component';
import { UpdateRefuelingComponent } from './refueling/update-refueling/update-refueling.component';
import { DetailsRefuelingComponent } from './refueling/details-refueling/details-refueling.component';
import { ListRefuelingComponent } from './refueling/list-refueling/list-refueling.component';
import { UseComponent } from './use/use.component';
import { CreateUseComponent } from './use/create-use/create-use.component';
import { UpdateUseComponent } from './use/update-use/update-use.component';
import { DetailsUseComponent } from './use/details-use/details-use.component';
import { ListUseComponent } from './use/list-use/list-use.component';
import { SharedVehicleComponent } from './shared-vehicle/shared-vehicle.component';
import { DetailsSharedVehicleComponent } from './shared-vehicle/details-shared-vehicle/details-shared-vehicle.component';
import { ListSharedVehicleComponent } from './shared-vehicle/list-shared-vehicle/list-shared-vehicle.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
      children: [
        { path: 'userData', component: UserDataComponent,
          children: [
            { path: 'create', component: CreateUserDataComponent },
            { path: 'update', component: UpdateUserDataComponent },
            { path: 'details', component: DetailsUserDataComponent },
            { path: 'changePwd', component: ChangePasswordComponent }
          ]
        },
        { path: 'vehicle', component: VehicleComponent, canActivate: [SuperuserGuard],
          children: [
            { path: 'create', component: CreateVehicleComponent },
            { path: 'update/:id', component: UpdateVehicleComponent },
            { path: 'details/:id', component: DetailsVehicleComponent },
            { path: 'list', component: ListVehicleComponent }
          ]
        },
        { path: 'inspection', component: InspectionComponent, canActivate: [SuperuserGuard],
          children: [
            { path: 'create', component: CreateInspectionComponent },
            { path: 'update/:id', component: UpdateInspectionComponent },
            { path: 'details/:id', component: DetailsInspectionComponent },
            { path: 'list', component: ListInspectionComponent }
          ]
        },
        { path: 'insurance', component: InsuranceComponent, canActivate: [SuperuserGuard],
          children: [
            { path: 'create', component: CreateInsuranceComponent },
            { path: 'update/:id', component: UpdateInsuranceComponent },
            { path: 'details/:id', component: DetailsInsuranceComponent },
            { path: 'list', component: ListInsuranceComponent }
          ]
        },
        { path: 'repair', component: RepairComponent, canActivate: [SuperuserGuard],
          children: [
            { path: 'create', component: CreateRepairComponent },
            { path: 'update/:id', component: UpdateRepairComponent },
            { path: 'details/:id', component: DetailsRepairComponent },
            { path: 'list', component: ListRepairComponent }
          ]
        },
        { path: 'refueling', component: RefuelingComponent,
          children: [
            { path: 'create', component: CreateRefuelingComponent },
            { path: 'update/:id', component: UpdateRefuelingComponent },
            { path: 'details/:id', component: DetailsRefuelingComponent },
            { path: 'list', component: ListRefuelingComponent }
          ]
        },
        { path: 'use', component: UseComponent,
          children: [
            { path: 'create', component: CreateUseComponent },
            { path: 'update/:id', component: UpdateUseComponent },
            { path: 'details/:id', component: DetailsUseComponent },
            { path: 'list', component: ListUseComponent }
          ]
        },
        { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
          canActivate: [AdminGuard]
        },
        { path: 'drivers', loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversModule),
          canActivate: [SuperuserGuard]
        },
        { path: 'sharedVehicle', component: SharedVehicleComponent, canActivate: [UserGuard],
          children: [
            { path: 'details/:id', component: DetailsSharedVehicleComponent },
            { path: 'list', component: ListSharedVehicleComponent}
          ]
        }
      ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
