import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from './../../../../assets/canvasjs/canvasjs.min';

import { StatisticsService } from '../statistics.service';
import { AlertService } from '../../../_services/alert.service';
import { StatsElement } from '../../../_models/stats-element';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit {
  form: FormGroup;
  query;
  fuelCostsForUser: StatsElement[];
  mileageForUser: StatsElement[];

  constructor(
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {
      validator: CheckDateRange('startDate', 'endDate')
    });

    let endDate: Date;
    endDate = new Date();
    this.query = {
      startDate: (endDate.getFullYear() - 1) + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate(),
      endDate: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
    };
    this.renderChart1();
    this.renderChart2();
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
      endDate: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
    };
    this.renderChart1();
    this.renderChart2();
  }

  renderChart1() {
    this.statisticsService.getFuelCostsForUser(this.query).subscribe(
      data => {
        this.fuelCostsForUser = data;
        let dataPoints = [];
        for (let element of this.fuelCostsForUser) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('FuelCostsForUser', {
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
            dataPoints: dataPoints
          }]
        });
        chart.render();
      },
      error => {
        this.alertService.error(error);
      });
  }

  renderChart2() {
    this.statisticsService.getMileageForUser(this.query).subscribe(
      data => {
        this.mileageForUser = data;
        let dataPoints = [];
        for (let element of this.mileageForUser) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('MileageForUser', {
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
            dataPoints: dataPoints
          }]
        });
        chart.render();
      },
      error => {
        this.alertService.error(error);
      });
  }
}
