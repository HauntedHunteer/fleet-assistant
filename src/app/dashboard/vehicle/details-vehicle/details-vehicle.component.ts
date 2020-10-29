import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private alertService: AlertService,
    private matDialog: MatDialog
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

  confirmDialog(): void {

    const message = `Czy na pewno chcesz usunąć ten pojazd?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.vehicleService.deleteVehicle(this.vehicleId).subscribe(
          data => {
            this.alertService.info('Pojazd został usunięty pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
