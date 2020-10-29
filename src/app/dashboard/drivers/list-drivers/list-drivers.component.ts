import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DriversService } from '../drivers.service';
import { AlertService } from '../../../_services/alert.service';
import { User } from '../../../_models/user';


@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent implements OnInit {
  displayedColumns: string[] = ['email', 'id'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private driversService: DriversService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.driversService.getDriversList().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
