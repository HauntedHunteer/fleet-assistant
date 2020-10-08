import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
  }

}