import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RefuelingService } from '../refueling.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { Vehicle } from '../../../_models/vehicle';
import { Refueling } from '../../../_models/refueling';

@Component({
  selector: 'app-create-refueling',
  templateUrl: './create-refueling.component.html',
  styleUrls: ['./create-refueling.component.css']
})
export class CreateRefuelingComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  userId: string;
  query;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private refuelingService: RefuelingService,
    private vehicleService: VehicleService,
    private tokenStorageService: TokenStorageService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;

        this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
          data => {
            this.vehicle = data;
            this.userId = this.tokenStorageService.getUser().id;
            this.query = {
              idV: this.vehicleId
            };
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group( {
      cost: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,3}|[0-9]\\d{0,3}\\.\\d{1,2})$')]],
      litre: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,2}|[0-9]\\d{0,2}\\.\\d{1,2})$')]],
      refuelingDate: ['', Validators.required],
      description: ['', Validators.maxLength(100)]
    });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    const refueling: Refueling = {
      id: '',
      vehicleId: this.vehicleId,
      userId: this.userId,
      refuelingDate: this.f.refuelingDate.value,
      litre: this.f.litre.value,
      cost: this.f.cost.value,
      description: this.f.description.value,
    };
    this.refuelingService.createRefueling(refueling).subscribe(
      data => {
        this.alertService.success('Tankowanie dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
      },
      error => {
        this.alertService.error(error);
      });
  }

}
