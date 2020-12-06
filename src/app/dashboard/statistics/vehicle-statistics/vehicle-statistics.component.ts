import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from './../../../../assets/canvasjs/canvasjs.min';

import { StatisticsService } from '../statistics.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { StatsElement } from '../../../_models/stats-element';
import { Vehicle } from '../../../_models/vehicle';

import { CheckDateRange } from '../../../_helpers/check-date-range';

@Component({
  selector: 'app-vehicle-statistics',
  templateUrl: './vehicle-statistics.component.html',
  styleUrls: ['./vehicle-statistics.component.css']
})
export class VehicleStatisticsComponent implements OnInit {
  form: FormGroup;
  query;
  vehiclesList: Vehicle[];
  fuelCostsForVehicle: StatsElement[];
  mileageForVehicle: StatsElement[];
  vehicleCosts: StatsElement[];
  mileageGrouped: StatsElement[];

  constructor(
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
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
      vehiclesList: ['', Validators.required]
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
      vehicleId: this.f.vehiclesList.value
    };
    this.renderChart1();
    this.renderChart2();
    this.renderChart3();
    this.renderChart4();
  }

  renderChart1() {
    this.statisticsService.getFuelCostsForVehicle(this.query).subscribe(
      data => {
        this.fuelCostsForVehicle = data;
        const dataPoints = [];
        for (const element of this.fuelCostsForVehicle) {
          dataPoints.push({
            y: element.value,
            x: new Date(element.name)
          });
        }
        const chart = new CanvasJS.Chart('FuelCostsForVehicle', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Koszty tankowania ',
            fontFamily: 'arial',
            fontWeight: 'normal'
          },
          axisY: {
            title: 'PLN',
          },
          axisX: {
            valueFormatString: 'DD-MM-YY'
          },
          data: [{
            type: 'line',
            indexLabelFontSize: 16,
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{x}:</span> {y} PLN',
            xValueFormatString: 'DD-MM-YYYY',
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
    this.statisticsService.getMileageForVehicle(this.query).subscribe(
      data => {
        this.mileageForVehicle = data;
        const dataPoints = [];
        for (const element of this.mileageForVehicle) {
          dataPoints.push({
            y: element.value,
            x: new Date(element.name)
          });
        }
        const chart = new CanvasJS.Chart('MileageForVehicle', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Przebiegi pojazdu',
            fontFamily: 'arial',
            fontWeight: 'normal'
          },
          axisY: {
            title: 'km',
          },
          axisX: {
            valueFormatString: 'DD-MM-YY'
          },
          data: [{
            type: 'line',
            indexLabelFontSize: 16,
            toolTipContent: '<span style=\'"\'color: #4f81bc;\'"\'>{x}:</span> {y} km',
            xValueFormatString: 'DD-MM-YYYY',
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
    this.statisticsService.getVehicleCosts(this.query).subscribe(
      data => {
        this.vehicleCosts = data;
        const dataPoints = [];
        let total = 0.00;
        for (const element of this.vehicleCosts) {
          total += element.value;
          dataPoints.push({
            y: element.value,
            name: element.name
          });
        }
        const chart = new CanvasJS.Chart('VehicleCosts', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Koszty utrzymania pojazdu',
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
    this.statisticsService.getMileageGrouped(this.query).subscribe(
      data => {
        this.mileageGrouped = data;
        const dataPoints = [];
        for (const element of this.mileageGrouped) {
          dataPoints.push({
            y: element.value,
            label: element.name
          });
        }
        const chart = new CanvasJS.Chart('MileageGrouped', {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Długość przebiegów dla trzech cykli',
            fontFamily: 'arial'
          },
          axisY: {
            title: 'km',
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
