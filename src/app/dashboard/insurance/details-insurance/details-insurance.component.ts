import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService} from '../../vehicle/vehicle.service';
import { InsuranceService } from '../insurance.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Insurance } from '../../../_models/insurance';

@Component({
  selector: 'app-details-insurance',
  templateUrl: './details-insurance.component.html',
  styleUrls: ['./details-insurance.component.css']
})
export class DetailsInsuranceComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  insurance: Insurance;
  insuranceId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private insuranceService: InsuranceService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.insuranceId = parameter.id;
        this.insuranceService.getInsuranceDetails(this.insuranceId).subscribe(
          insuranceData => {
            this.insurance = insuranceData;
            this.vehicleId = insuranceData.vehicleId;
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
