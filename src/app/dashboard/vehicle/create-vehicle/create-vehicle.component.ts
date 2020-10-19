import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { VehicleMake} from '../../../_models/vehicle-make';
import { FuelType } from '../../../_models/fuel-type';
import { VehicleStatusName } from '../../../_helpers/VehicleStatusName';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {
  form: FormGroup;
  makes: VehicleMake[];
  fuelTypes: FuelType[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe(
      data => {
        this.makes = data;
      },
      error => {
        this.alertService.error(error);
      });

    this.vehicleService.getFuelTypes().subscribe(
      data => {
        this.fuelTypes = data;
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group( {
      makes: ['', Validators.required],
      model: ['', [Validators.required, Validators.maxLength(45)]],
      year: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      mileage: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('[0-9]{1,7}')]],
      vehicleRegistrationNumber: ['', [Validators.required, Validators.maxLength(10)]],
      vinNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      fuelTypes: ['', Validators.required],
      cityFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
      countryFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
      averageFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const vehicle: Vehicle = {
      id: '',
      make: this.f.makes.value.name,
      model: this.f.model.value,
      year: this.f.year.value,
      color: this.f.color.value,
      mileage: this.f.mileage.value,
      vinNumber: this.f.vinNumber.value,
      vehicleRegistrationNumber: this.f.vehicleRegistrationNumber.value,
      vehicleStatus: VehicleStatusName.ACTIVE,
      fuelType: this.f.fuelTypes.value.name,
      cityFuelConsumption: this.f.cityFuelConsumption.value,
      countryFuelConsumption: this.f.countryFuelConsumption.value,
      averageFuelConsumption: this.f.averageFuelConsumption.value,
      company: ''
    };
    this.vehicleService.createVehicle(vehicle).subscribe(
      data => {
        this.alertService.success('Pojazd dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route});
      },
        error => {
      this.alertService.error(error);
      });
  }
}
