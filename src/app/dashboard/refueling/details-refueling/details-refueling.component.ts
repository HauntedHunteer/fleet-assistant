import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { VehicleService} from '../../vehicle/vehicle.service';
import { RefuelingService } from '../refueling.service';
import { AccountService } from '../../../account/account.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Refueling } from '../../../_models/refueling';
import { User } from '../../../_models/user';

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
  userId: string;
  userMail: string;
  currentUser: User;
  query;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private refuelingService: RefuelingService,
    private accountService: AccountService,
    private alertService: AlertService,
    private tokenStorageService: TokenStorageService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.refuelingId = parameter.id;
        this.refuelingService.getRefuelingDetails(this.refuelingId).subscribe(
          refuelingData => {
            this.refueling = refuelingData;
            this.vehicleId = refuelingData.vehicleId;
            this.userId = refuelingData.userId;
            this.currentUser = this.tokenStorageService.getUser();
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

            if (this.currentUser.roles === 'ROLE_SUPERUSER') {
              this.accountService.getMail(this.userId).subscribe(
                data => {
                  this.userMail = data.email;
                },
                error => {
                  this.alertService.error(error);
                });
            }
          },
          error => {
            this.alertService.error(error);
          });
      });
  }

  confirmDialog(): void {

    const message = `Czy na pewno chcesz usunąć to tankowanie?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        this.refuelingService.deleteRefueling(this.refuelingId).subscribe(
          data => {
            this.alertService.info('Tankowanie zostało usunięte pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }

}
