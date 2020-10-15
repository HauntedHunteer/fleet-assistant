import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { AlertService } from '../../../_services/alert.service';
import { UserAddressAndData } from '../../../_models/user-address-and-data';



@Component({
  selector: 'app-details-user-data',
  templateUrl: './details-user-data.component.html',
  styleUrls: ['./details-user-data.component.css']
})
export class DetailsUserDataComponent implements OnInit {
  userAddressAndData: UserAddressAndData;
  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.userDataService.viewUserData().subscribe(
      data => {
        this.userAddressAndData = data;
    },
      error => {
        if (error === 'Nie znaleziono danych użytkownika') {
          this.router.navigate(['dashboard/userData/create']);
        }
        else {
          this.alertService.error(error);
        }
      });
  }

}
