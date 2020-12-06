import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from './../../../../assets/canvasjs/canvasjs.min';

import { StatisticsService } from '../statistics.service';
import { DriversService } from '../../drivers/drivers.service';
import { AlertService } from '../../../_services/alert.service';
import { StatsElement } from '../../../_models/stats-element';
import { User} from '../../../_models/user';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-driver-statistics',
  templateUrl: './driver-statistics.component.html',
  styleUrls: ['./driver-statistics.component.css']
})
export class DriverStatisticsComponent implements OnInit {
  form: FormGroup;
  query;

  fuelCostsForDriver: StatsElement[];
  mileageForDriver: StatsElement[];
  driversList: User[];

  constructor(
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
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
      driversList: ['', Validators.required]
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
      userId: this.f.driversList.value
    };
    this.renderChart1();
    this.renderChart2();

  }

  renderChart1() {
    this.statisticsService.getFuelCostsForDriver(this.query).subscribe(
      data => {
        this.fuelCostsForDriver = data;
        const dataPoints = [];
        for (const element of this.fuelCostsForDriver) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('FuelCostsForDriver', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Koszty paliwa',
            fontFamily: 'arial'
          },
          axisY: {
            title: 'PLN',
          },
          data: [{
            type: 'column',
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{label}:</span> {y} PLN',
            dataPoints
          }]
        });
        chart.render();
      },
      error => {
        this.alertService.error(error);
      });
  }

  renderChart2() {
    this.statisticsService.getMileageForDriver(this.query).subscribe(
      data => {
        this.mileageForDriver = data;
        const dataPoints = [];
        for (const element of this.mileageForDriver) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('MileageForDriver', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Przebiegi',
            fontFamily: 'arial'
          },
          axisY: {
            title: 'km'
          },
          data: [{
            type: 'column',
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{label}:</span> {y} km',
            dataPoints
          }]
        });
        chart.render();
      },
      error => {
        this.alertService.error(error);
      });
  }

}
