import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

import { ReportService } from '../report.service';
import { DriversService } from '../../drivers/drivers.service';
import { AlertService } from '../../../_services/alert.service';
import { User } from '../../../_models/user';
import { List } from '../../../_models/list';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {
  form: FormGroup;
  query;
  driversList: User[];
  reportSubjects: List[] = [
    { backendValue: 'use', frontendText: 'Przebiegi' },
    { backendValue: 'refueling', frontendText: 'Tankowania' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private driversService: DriversService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.driversService.getDriversList().subscribe(
      dataDrivers => {
        this.driversList = dataDrivers;
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      driversList: ['', Validators.required],
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
      userId: this.f.driversList.value,
      reportSubject: this.f.reportSubject.value
    };

    this.reportService.generateUserReport(this.query).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, this.makeFileName());
      },
      error => {
        this.alertService.error(error);
      });
  }

  makeFileName(): string {
    const chosenUser: User = this.driversList.find(element => element.id === this.query.userId);
    const email: string = chosenUser.email + '_';
    const subject: string = this.reportSubjects.find(element => element.backendValue === this.query.reportSubject).frontendText + '_';
    const filename: string = email + subject + this.query.startDate + '_' + this.query.endDate;
    return filename;
  }
}
