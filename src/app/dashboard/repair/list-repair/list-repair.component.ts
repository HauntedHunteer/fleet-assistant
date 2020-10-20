import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RepairService } from '../repair.service';
import { AlertService } from '../../../_services/alert.service';
import { Repair } from '../../../_models/repair';

@Component({
  selector: 'app-list-repair',
  templateUrl: './list-repair.component.html',
  styleUrls: ['./list-repair.component.css']
})
export class ListRepairComponent implements OnInit {
  displayedColumns: string[] = ['repairDate', 'title', 'id'];
  dataSource: MatTableDataSource<Repair>;
  vehicleId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private repairService: RepairService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;
        this.repairService.getRepairListById(this.vehicleId).subscribe(
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
