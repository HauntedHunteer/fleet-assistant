import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AccountService } from '../account/account.service';
import { TokenStorageService } from '../account/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(
    private accountService: AccountService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }

  logout() {
    this.accountService.logout();
  }
 /* user: User;

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
*/
}
