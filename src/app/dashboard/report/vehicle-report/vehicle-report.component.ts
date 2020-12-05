import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReportService } from '../report.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { List } from '../../../_models/list';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-vehicle-report',
  templateUrl: './vehicle-report.component.html',
  styleUrls: ['./vehicle-report.component.css']
})
export class VehicleReportComponent implements OnInit {
  form: FormGroup;
  query;
  vehiclesList: Vehicle[];
  reportSubjects: List[] = [
    { backendValue: 'use', frontendText: 'Przebiegi' },
    { backendValue: 'inspection', frontendText: 'Przeglądy' },
    { backendValue: 'repair', frontendText: 'Naprawy' },
    { backendValue: 'insurance', frontendText: 'Ubezpieczenia' },
    { backendValue: 'refueling', frontendText: 'Tankowania' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleList().subscribe(
      dataVehicles => {
        this.vehiclesList = dataVehicles;
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      vehiclesList: ['', Validators.required],
      reportSubject: ['', Validators.required]
    }, {
      validator: CheckDateRange('startDate', 'endDate')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    let startDate: Date;
    startDate = new Date(this.f.startDate.value);
    let endDate: Date;
    endDate = new Date(this.f.endDate.value);
    this.query = {
      startDate: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
      endDate: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
      vehicleId: this.f.vehiclesList.value,
      reportSubject: this.f.reportSubject.value
    };

    this.reportService.generateVehicleReport(this.query).subscribe(
      data => {

      },
      error => {
        this.alertService.error(error);
      });
  }

}
