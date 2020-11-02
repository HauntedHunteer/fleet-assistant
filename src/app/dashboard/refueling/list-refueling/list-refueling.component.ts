import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RefuelingService } from '../refueling.service';
import { AlertService } from '../../../_services/alert.service';
import { Refueling } from '../../../_models/refueling';
import { TokenStorageService } from '../../../account/token-storage.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-list-refueling',
  templateUrl: './list-refueling.component.html',
  styleUrls: ['./list-refueling.component.css']
})
export class ListRefuelingComponent implements OnInit {
  displayedColumns: string[] = ['refuelingDate', 'cost', 'id'];
  dataSource: MatTableDataSource<Refueling>;
  vehicleId: string;
  query;
  currentUser: User;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private refuelingService: RefuelingService,
    private alertService: AlertService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.currentUser = this.tokenStorageService.getUser();
        this.query = {
          idV: this.vehicleId
        };
        if (this.currentUser.roles === 'ROLE_SUPERUSER') {
          this.refuelingService.getRefuelingListById(this.vehicleId).subscribe(
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
          this.refuelingService.getSharedRefuelingList(this.vehicleId, this.currentUser.id).subscribe(
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
