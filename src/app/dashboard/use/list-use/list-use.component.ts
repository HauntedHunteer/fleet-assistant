import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UseService } from '../use.service';
import { AlertService } from '../../../_services/alert.service';
import { Use } from '../../../_models/use';

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private useService: UseService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.query = {
          idV: this.vehicleId
        };
        this.useService.getUseListById(this.vehicleId).subscribe(
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
