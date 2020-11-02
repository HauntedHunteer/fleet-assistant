import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { VehicleService} from '../../vehicle/vehicle.service';
import { UseService } from '../use.service';
import { AccountService } from '../../../account/account.service';
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
  userId: string;
  userMail: string;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private useService: UseService,
    private alertService: AlertService,
    private accountService: AccountService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.useId = parameter.id;
        this.useService.getUseDetails(this.useId).subscribe(
          useData => {
            this.use = useData;
            this.vehicleId = useData.vehicleId;
            this.userId = useData.userId;
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

            this.accountService.getMail(this.userId).subscribe(
              data => {
                this.userMail = data.email;
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

    const message = `Czy na pewno chcesz usunąć ten przebieg?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.useService.deleteUse(this.useId).subscribe(
          data => {
            this.alertService.info('Przebieg został usunięty pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
