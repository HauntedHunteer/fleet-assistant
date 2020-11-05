import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogComponent, ConfirmDialogModel} from '../../../site-framework/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { UsersService} from '../users.service';
import { AlertService } from '../../../_services/alert.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  user: User;
  userId: string;
  userStatus: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private alertService: AlertService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.userId = parameter.id;
        this.usersService.getUserDetails(this.userId).subscribe(
          data => {
            this.user = data;
            this.userStatus = data.userStatus;
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });
  }

  confirmDialog(): void {

    const message = `Czy na pewno chcesz zmienić status użytkownika?`;

    const dialogData = new ConfirmDialogModel('Potwierdź działanie', message);

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result: boolean = dialogResult;
      if (result) {
        if (this.userStatus === 'BLOCKED') {
          this.userStatus = 'ACTIVE';
        }
        else {
          this.userStatus = 'BLOCKED';
        }
        this.usersService.changeUserStatus(this.userId, this.userStatus).subscribe(
          data => {
            this.alertService.info('Status użytkownika został zmieniony pomyślnie', { keepAfterRouteChange : true});
            this.router.navigate(['../../list'], {relativeTo: this.route});
          },
          error => {
            this.alertService.error(error);
          });
      }
    });
  }
}
