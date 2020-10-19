import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InsuranceService} from '../insurance.service';
import { AlertService } from '../../../_services/alert.service';
import { Insurance } from '../../../_models/insurance';


@Component({
  selector: 'app-list-insurance',
  templateUrl: './list-insurance.component.html',
  styleUrls: ['./list-insurance.component.css']
})
export class ListInsuranceComponent implements OnInit {
  displayedColumns: string[] = ['expirationDate', 'cost', 'id'];
  dataSource: MatTableDataSource<Insurance>;
  vehicleId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private insuranceService: InsuranceService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.insuranceService.getInsuranceListById(this.vehicleId).subscribe(
          data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error => {
            this.alertService.error(error);
          });
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
