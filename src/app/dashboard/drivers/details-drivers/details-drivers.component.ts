import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDataService } from '../../user-data/user-data.service';
import { AlertService } from '../../../_services/alert.service';
import { UserData } from '../../../_models/user-data';

@Component({
  selector: 'app-details-drivers',
  templateUrl: './details-drivers.component.html',
  styleUrls: ['./details-drivers.component.css']
})
export class DetailsDriversComponent implements OnInit {
  userData: UserData;
  driverId: string;
  noData: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.driverId = parameter.id;
        this.userDataService.getUserData(this.driverId).subscribe(
          data => {
            this.userData = data;
          },
          error => {
            if (error === 'Dane nie istnieją') {
              this.noData = true;
            }
            else {
              this.alertService.error(error);
              this.noData = false;
            }
          });
      },
      error => {
        this.alertService.error(error);
      });
  }

}
