import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VehicleService } from '../vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {
  displayedColumns: string[] = ['make', 'model', 'year', 'vehicleRegistrationNumber', 'id'];
  dataSource: MatTableDataSource<Vehicle>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleList().subscribe(
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
