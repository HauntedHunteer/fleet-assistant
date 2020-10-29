import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.css']
})
export class AccountLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
              ) {

  }

  ngOnInit(): void {
    // redirect to dashboard if already logged in
    if (this.tokenStorageService.getUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

}
