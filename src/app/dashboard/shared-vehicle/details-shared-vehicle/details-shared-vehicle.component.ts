import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';

@Component({
  selector: 'app-details-shared-vehicle',
  templateUrl: './details-shared-vehicle.component.html',
  styleUrls: ['./details-shared-vehicle.component.css']
})
export class DetailsSharedVehicleComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.vehicleId = parameter.id;
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
      });
  }

}
