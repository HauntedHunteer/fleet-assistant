import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from './../../../../assets/canvasjs/canvasjs.min';

import { StatisticsService } from '../statistics.service';
import { AlertService } from '../../../_services/alert.service';
import { StatsElement } from '../../../_models/stats-element';

@Component({
  selector: 'app-fleet-statistics',
  templateUrl: './fleet-statistics.component.html',
  styleUrls: ['./fleet-statistics.component.css']
})
export class FleetStatisticsComponent implements OnInit {
  form: FormGroup;
  query;
  fuelConsumptionCostsForFleet: StatsElement[];
  mileageForFleet: StatsElement[];
  vehicleCostsForFleet: StatsElement[];
  //dataPoints1;
  //dataPoints2;
  //dataPoints3;
  isFirst;
  isSecond;
  isThird;
  loading1: boolean;
  loading2: boolean;
  loading3: boolean;

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
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.isFirst = false;
    this.isSecond = false;
    this.isThird = false;
    // todo make service's call
    let startDate: Date;
    startDate = new Date(this.f.startDate.value);
    let endDate: Date;
    endDate = new Date(this.f.endDate.value);
    this.query = {
      startDate: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(),
      endDate: endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
    };
    this.loading1 = true;
    this.statisticsService.getFuelConsumptionCostsForFleet(this.query).subscribe(
      data => {
        if (data.length !== 0) {
          this.fuelConsumptionCostsForFleet = data;
          let dataPoints = [];
          for (let element of this.fuelConsumptionCostsForFleet) {
            dataPoints.push({
              y: element.value,
              label: element.name
            });
          }
          const chart = new CanvasJS.Chart('FuelConsumptionCostsForFleet', {
            animationEnabled: true,
            exportEnabled: true,
            title: {
              text: 'Koszty paliwa'
            },
            data: [{
              type: 'column',
              dataPoints: dataPoints
            }]
          });
          this.loading1 = false;
          this.isFirst = true;
          chart.render();
        }
      },
      error => {
        this.alertService.error(error);
        this.loading1 = false;
      });
    this.loading2 = true;
    this.statisticsService.getMileageForFleet(this.query).subscribe(
      data => {
        if (data.length !== 0) {
          this.mileageForFleet = data;
          let dataPoints = [];
          for (let element of this.mileageForFleet) {
            dataPoints.push({
              y: element.value,
              label: element.name
            });
          }
          const chart2 = new CanvasJS.Chart('MileageForFleet', {
            animationEnabled: true,
            exportEnabled: true,
            title: {
              text: 'Przebiegi'
            },
            data: [{
              type: 'column',
              dataPoints: dataPoints
            }]
          });
          this.loading2 = false;
          this.isSecond = true;
          chart2.render();
        }
      },
      error => {
        this.alertService.error(error);
        this.loading2 = false;
      });
    this.loading3 = true;
    this.statisticsService.getVehicleCostsForFleet(this.query).subscribe(
      data => {
        if (data.length !== 0) {
          this.vehicleCostsForFleet = data;
          console.log(this.vehicleCostsForFleet);
          let dataPoints = [];
          for (let element of this.vehicleCostsForFleet) {
            dataPoints.push({
              y: element.value,
              name: element.name
            });
          }
          const chart3 = new CanvasJS.Chart('VehicleCostsForFleet', {
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            title: {
              text: 'Koszty utrzymania floty'
            },
            data: [{
              type: 'pie',
              showInLegend: true,
              toolTipContent: '<b>{name}</b>: {y} PLN (#percent%)',
              indexLabel: '{name} - #percent%',
              dataPoints: dataPoints
            }]
          });
          this.loading3 = false;
          this.isThird = true;
          chart3.render();
        }
      },
      error => {
        this.alertService.error(error);
        this.loading3 = false;
      });
  }
}

