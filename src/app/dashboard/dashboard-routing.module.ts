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
        },
        { path: 'inspection', component: InspectionComponent,
          children: [
            { path: 'create', component: CreateInspectionComponent },
            { path: 'update/:id', component: UpdateInspectionComponent },
            { path: 'details/:id', component: DetailsInspectionComponent },
            { path: 'list', component: ListInspectionComponent }
          ]
        },
        { path: 'insurance', component: InsuranceComponent,
          children: [
            { path: 'create', component: CreateInsuranceComponent },
            { path: 'update/:id', component: UpdateInsuranceComponent },
            { path: 'details/:id', component: DetailsInsuranceComponent },
            { path: 'list', component: ListInsuranceComponent }
          ]
        },
        { path: 'repair', component: RepairComponent,
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
        }
      ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
