import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UseService } from '../use.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { Vehicle } from '../../../_models/vehicle';
import { Use } from '../../../_models/use';
import { List } from '../../../_models/list';

@Component({
  selector: 'app-create-use',
  templateUrl: './create-use.component.html',
  styleUrls: ['./create-use.component.css']
})
export class CreateUseComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  userId: string;
  tripTypes: List[] = [
    { backendValue: 'city', frontendText: 'Miejski' },
    { backendValue: 'country', frontendText: 'Pozamiejski' },
    { backendValue: 'average', frontendText: 'Mieszany' }
  ];
  query;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private useService: UseService,
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
      tripDate: ['', Validators.required],
      trip: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('^([1-9]\\d{1}|[1-9]\\d{0,4})$')]],
      tripType: ['', Validators.required],
      description: ['', Validators.maxLength(255)]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const use: Use = {
      id: '',
      vehicleId: this.vehicleId,
      userId: this.userId,
      trip: this.f.trip.value,
      tripDate: this.f.tripDate.value,
      tripType: this.f.tripType.value,
      description: this.f.description.value
    };
    this.useService.createUse(use).subscribe(
      data => {
        this.alertService.success('Przebieg dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
      },
      error => {
        this.alertService.error(error);
      });
  }
}


