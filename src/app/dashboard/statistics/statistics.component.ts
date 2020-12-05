import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../account/token-storage.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  currentUser: User;

  constructor(
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
  }

}
