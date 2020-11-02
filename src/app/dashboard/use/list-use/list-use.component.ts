import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UseService } from '../use.service';
import { AlertService } from '../../../_services/alert.service';
import { Use } from '../../../_models/use';
import { TokenStorageService } from '../../../account/token-storage.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-list-use',
  templateUrl: './list-use.component.html',
  styleUrls: ['./list-use.component.css']
})
export class ListUseComponent implements OnInit {
  displayedColumns: string[] = ['tripDate', 'trip', 'id'];
  dataSource: MatTableDataSource<Use>;
  vehicleId: string;
  query;
  currentUser: User;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private useService: UseService,
    private alertService: AlertService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.currentUser = this.tokenStorageService.getUser();
        this.query = {
          idV: this.vehicleId
        };
        if (this.currentUser.roles === 'ROLE_SUPERUSER') {
          this.useService.getUseListById(this.vehicleId).subscribe(
            data => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              this.alertService.error(error);
            });
        }
        if (this.currentUser.roles === 'ROLE_USER') {
          this.useService.getSharedUseList(this.vehicleId, this.currentUser.id).subscribe(
            data => {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              this.alertService.error(error);
            });
        }
      },
      error => {
        this.alertService.error(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
