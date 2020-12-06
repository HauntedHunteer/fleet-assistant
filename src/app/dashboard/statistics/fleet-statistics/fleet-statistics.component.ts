import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from './../../../../assets/canvasjs/canvasjs.min';

import { StatisticsService } from '../statistics.service';
import { AlertService } from '../../../_services/alert.service';
import { StatsElement } from '../../../_models/stats-element';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-fleet-statistics',
  templateUrl: './fleet-statistics.component.html',
  styleUrls: ['./fleet-statistics.component.css']
})
export class FleetStatisticsComponent implements OnInit {
  form: FormGroup;
  query;
  fuelCostsForFleet: StatsElement[];
  mileageForFleet: StatsElement[];
  vehicleCostsForFleet: StatsElement[];
  vehicleUseCountForFleet: StatsElement[];

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
    this.renderChart3();
    this.renderChart4();
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
    this.renderChart3();
    this.renderChart4();
  }

  renderChart1() {
    this.statisticsService.getFuelCostsForFleet(this.query).subscribe(
      data => {
        this.fuelCostsForFleet = data;
        const dataPoints = [];
        for (const element of this.fuelCostsForFleet) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('FuelCostsForFleet', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Sumaryczne koszty paliwa',
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
    this.statisticsService.getMileageForFleet(this.query).subscribe(
      data => {
        this.mileageForFleet = data;
        const dataPoints = [];
        for (const element of this.mileageForFleet) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('MileageForFleet', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Sumaryczne przebiegi',
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

  renderChart3() {
    this.statisticsService.getVehicleCostsForFleet(this.query).subscribe(
      data => {
        this.vehicleCostsForFleet = data;
        const dataPoints = [];
        let total = 0.00;
        for (const element of this.vehicleCostsForFleet) {
          total += element.value;
          dataPoints.push({
            y: element.value,
            name: element.name
          });
        }
        const chart = new CanvasJS.Chart('VehicleCostsForFleet', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Koszty utrzymania floty',
            fontFamily: 'arial',
            fontWeight: 'normal'
          },
          subtitles: [{
            text: 'Całkowity koszt',
            fontSize: 14
          }],
          data: [{
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{name}:</span> {y} PLN (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints
          }]
        });
        chart.render();
        chart.subtitles[0].set('text', 'Całkowity koszt: ' + total.toFixed(2) + ' PLN');
      },
      error => {
        this.alertService.error(error);
      });
  }

  renderChart4() {
    this.statisticsService.getVehicleUseCountForFleet(this.query).subscribe(
      data => {
        this.vehicleUseCountForFleet = data;
        const dataPoints = [];
        for (const element of this.vehicleUseCountForFleet) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('VehicleUseCountForFleet', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Liczba użyć (przebiegów)',
            fontFamily: 'arial'
          },
          data: [{
            type: 'column',
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{label}:</span> {y}',
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


