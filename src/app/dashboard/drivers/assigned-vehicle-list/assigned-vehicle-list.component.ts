import { Component, OnInit } from '@angular/core';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { DriversService } from '../drivers.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { User } from '../../../_models/user';
import { Vehicle } from '../../../_models/vehicle';

@Component({
  selector: 'app-assigned-vehicle-list',
  templateUrl: './assigned-vehicle-list.component.html',
  styleUrls: ['./assigned-vehicle-list.component.css']
})
export class AssignedVehicleListComponent implements OnInit {
  drivers: User[];
  vehicleList: Vehicle[];
  constructor(
    private driversService: DriversService,
    private vehicleService: VehicleService,
    private alertService: AlertService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.driversService.getDriversList().subscribe(
      dataDrivers => {
        this.drivers = dataDrivers;
      },
      error => {
        this.alertService.error(error);
      });
  }

  showSharedVehicles(driverId) {
    this.vehicleService.getSharedVehicleList(driverId).subscribe(
      data => {
        this.vehicleList = data;
      },
      error => {
        this.alertService.error(error);
      });
  }
// todo
  /*
  confirmDialog(): void {

    const message = `Czy na pewno chcesz odebrać ten pojazd kierowcy?`;

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
*/
}
