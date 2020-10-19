import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VehicleService} from '../../vehicle/vehicle.service';
import { InspectionService } from '../inspection.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Inspection } from '../../../_models/inspection';

@Component({
  selector: 'app-details-inspection',
  templateUrl: './details-inspection.component.html',
  styleUrls: ['./details-inspection.component.css']
})
export class DetailsInspectionComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  inspection: Inspection;
  inspectionId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private inspectionService: InspectionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.inspectionId = parameter.id;
        this.inspectionService.getInspectionDetails(this.inspectionId).subscribe(
          inspectionData => {
            this.inspection = inspectionData;
            this.vehicleId = inspectionData.vehicleId;
            this.vehicleService.viewVehicleDetails(this.vehicleId).subscribe(
              data => {
                this.vehicle = data;
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
