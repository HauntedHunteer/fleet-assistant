import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private alertService: AlertService,
    private matDialog: MatDialog
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

  confirmDialog(): void {

    const message = `Czy na pewno chcesz usunąć to ubezpieczenie?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.insuranceService.deleteInsurance(this.insuranceId).subscribe(
          data => {
            this.alertService.info('Ubezpiecznie zostało usunięte pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
