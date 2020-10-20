import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { AlertService } from '../../../_services/alert.service';
import { UserData } from '../../../_models/user-data';


@Component({
  selector: 'app-details-user-data',
  templateUrl: './details-user-data.component.html',
  styleUrls: ['./details-user-data.component.css']
})
export class DetailsUserDataComponent implements OnInit {
  userData: UserData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe(
      data => {
        this.userData = data;
    },
      error => {
        if (error === 'Nie znaleziono danych użytkownika') {
          this.router.navigate(['../create'], {relativeTo: this.route});
        }
        else {
          this.alertService.error(error);
        }
      });
  }

}
