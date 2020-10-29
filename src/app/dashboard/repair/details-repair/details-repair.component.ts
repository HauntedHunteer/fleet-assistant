import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { VehicleService} from '../../vehicle/vehicle.service';
import { RepairService} from '../repair.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Repair } from '../../../_models/repair';

@Component({
  selector: 'app-details-repair',
  templateUrl: './details-repair.component.html',
  styleUrls: ['./details-repair.component.css']
})
export class DetailsRepairComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  repair: Repair;
  repairId: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private repairService: RepairService,
    private alertService: AlertService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.repairId = parameter.id;
        this.repairService.getRepairDetails(this.repairId).subscribe(
          repairData => {
            this.repair = repairData;
            this.vehicleId = repairData.vehicleId;
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

    const message = `Czy na pewno chcesz usunąć tę naprawę?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.repairService.deleteRepair(this.repairId).subscribe(
          data => {
            this.alertService.info('Naprawa została usunięta pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
