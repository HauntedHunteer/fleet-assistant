import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService} from '../../vehicle/vehicle.service';
import { RefuelingService } from '../refueling.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Refueling } from '../../../_models/refueling';

@Component({
  selector: 'app-details-refueling',
  templateUrl: './details-refueling.component.html',
  styleUrls: ['./details-refueling.component.css']
})
export class DetailsRefuelingComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  refueling: Refueling;
  refuelingId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private refuelingService: RefuelingService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.refuelingId = parameter.id;
        this.refuelingService.getRefuelingDetails(this.refuelingId).subscribe(
          refuelingData => {
            this.refueling = refuelingData;
            this.vehicleId = refuelingData.vehicleId;
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
