import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (this.currentUser.roles === 'ROLE_ADMIN') {
      this.router.navigate(['/dashboard/users/list'], {relativeTo: this.route});
    }
  }

  logout() {
    this.accountService.logout();
  }
}
