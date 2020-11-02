import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { AlertService } from '../../../_services/alert.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { UserData } from '../../../_models/user-data';
import { User } from '../../../_models/user';


@Component({
  selector: 'app-details-user-data',
  templateUrl: './details-user-data.component.html',
  styleUrls: ['./details-user-data.component.css']
})
export class DetailsUserDataComponent implements OnInit {
  userData: UserData;
  currentUser: User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private userDataService: UserDataService,
    private alertService: AlertService,
              ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userDataService.getUserData(this.currentUser.id).subscribe(
      data => {
        this.userData = data;
    },
      error => {
        if (error === 'Dane nie istnieją') {
          this.router.navigate(['../create'], {relativeTo: this.route});
        }
        else {
          this.alertService.error(error);
        }
      });
  }

}
