import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InspectionService } from '../inspection.service';
import { AlertService } from '../../../_services/alert.service';
import { Inspection } from '../../../_models/inspection';

@Component({
  selector: 'app-list-inspection',
  templateUrl: './list-inspection.component.html',
  styleUrls: ['./list-inspection.component.css']
})
export class ListInspectionComponent implements OnInit {
  displayedColumns: string[] = ['expirationDate', 'cost', 'id'];
  dataSource: MatTableDataSource<Inspection>;
  vehicleId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inspectionService: InspectionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.inspectionService.getInspectionListById(this.vehicleId).subscribe(
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
