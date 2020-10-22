import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService} from '../../vehicle/vehicle.service';
import { RepairService} from '../repair.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Repair } from '../../../_models/repair';

@Component({
  selector: 'app-details-repair',
  templateUrl: './details-repair.component.html',
  styleUrls: ['./details-repair.component.css']
})
export class DetailsRepairComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  repair: Repair;
  repairId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private repairService: RepairService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.repairId = parameter.id;
        this.repairService.getRepairDetails(this.repairId).subscribe(
          repairData => {
            this.repair = repairData;
            this.vehicleId = repairData.vehicleId;
            this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
              data => {
                this.vehicle = data;
                this.query = {
                  idV: this.vehicleId
                };
              },
              error => {
                this.alertService.error(error);
              });
          },
          error => {
            this.alertService.error(error);
          });
      });
  }

}
