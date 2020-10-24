import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService} from '../../vehicle/vehicle.service';
import { UseService } from '../use.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Use } from '../../../_models/use';

@Component({
  selector: 'app-details-use',
  templateUrl: './details-use.component.html',
  styleUrls: ['./details-use.component.css']
})
export class DetailsUseComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  use: Use;
  useId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private useService: UseService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.useId = parameter.id;
        this.useService.getUseDetails(this.useId).subscribe(
          useData => {
            this.use = useData;
            this.vehicleId = useData.vehicleId;
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
