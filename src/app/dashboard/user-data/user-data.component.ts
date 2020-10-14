import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAddressAndData } from '../../_models/user-address-and-data';
import { UserDataService } from './user-data.service';



@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  private userAddressAndData: UserAddressAndData;
  constructor(
    private router: Router,
    private userDataService: UserDataService) { }

  ngOnInit(): void { /*
    this.userDataService.viewUserData().subscribe(
      data => {
        this.userAddressAndData = data;

        if (this.userAddressAndData !== null) {
          this.router.navigate(['dashboard/userData/details']);
        } else {
          this.router.navigate(['dashboard/userData/create']);
        }
      },
      error => {
        console.log(error);
        this.router.navigate(['dashboard/userData/details']);
      });*/
  }

}
