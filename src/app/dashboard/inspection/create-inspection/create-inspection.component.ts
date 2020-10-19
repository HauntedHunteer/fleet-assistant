import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InspectionService } from '../inspection.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Inspection } from '../../../_models/inspection';

@Component({
  selector: 'app-create-inspection',
  templateUrl: './create-inspection.component.html',
  styleUrls: ['./create-inspection.component.css']
})
export class CreateInspectionComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inspectionService: InspectionService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;

        this.vehicleService.viewVehicleDetails(this.vehicleId).subscribe(
          data => {
            this.vehicle = data;
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group( {
      inspectionDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,2}|[0-9]\\d{0,2}\\.\\d{1,2})$')]],
      description: ['', Validators.maxLength(45)]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const inspection: Inspection = {
      id: '',
      vehicleId: this.vehicleId,
      inspectionDate: this.f.inspectionDate.value,
      expirationDate: this.f.expirationDate.value,
      cost: this.f.cost.value,
      description: this.f.description.value
    };
    this.inspectionService.createInspection(inspection).subscribe(
      data => {
        this.alertService.success('Przegląd dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
      },
      error => {
        this.alertService.error(error);
      });
  }
}
