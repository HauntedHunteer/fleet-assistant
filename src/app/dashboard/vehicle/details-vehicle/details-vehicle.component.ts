import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService } from '../vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';

@Component({
  selector: 'app-details-vehicle',
  templateUrl: './details-vehicle.component.html',
  styleUrls: ['./details-vehicle.component.css']
})
export class DetailsVehicleComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;

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
        this.vehicleService.viewVehicleDetails(this.vehicleId).subscribe(
          data => {
            this.vehicle = data;
          },
          error => {
            this.alertService.error(error);
          });
      });
  }

}
