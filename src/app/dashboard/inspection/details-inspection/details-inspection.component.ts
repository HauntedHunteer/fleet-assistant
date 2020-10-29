import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private inspectionService: InspectionService,
    private alertService: AlertService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.inspectionId = parameter.id;
        this.inspectionService.getInspectionDetails(this.inspectionId).subscribe(
          inspectionData => {
            this.inspection = inspectionData;
            this.vehicleId = inspectionData.vehicleId;
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

  confirmDialog(): void {

    const message = `Czy na pewno chcesz usunąć ten przegląd?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.inspectionService.deleteInspection(this.inspectionId).subscribe(
          data => {
            this.alertService.info('Przegląd został usunięty pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
