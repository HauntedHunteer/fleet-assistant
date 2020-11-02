import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { VehicleMake} from '../../../_models/vehicle-make';
import { FuelType } from '../../../_models/fuel-type';
import { VehicleStatusNameArray } from '../../../_helpers/VehicleStatusName';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  vehicle: Vehicle;
  vehicleId: string;
  form: FormGroup;
  makes: VehicleMake[];
  fuelTypes: FuelType[];
  vehicleStatus: string[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.vehicleId = parameter.id;
        this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
          data => {
            this.vehicle = data;
            this.vehicleService.getMakes().subscribe(
              dataMakes => {
                this.makes = dataMakes;
              },
              error => {
                this.alertService.error(error);
              });
            this.vehicleStatus = VehicleStatusNameArray;
            this.vehicleService.getFuelTypes().subscribe(
              dataFuels => {
                this.fuelTypes = dataFuels;
              },
              error => {
                this.alertService.error(error);
              });
            this.pushValues(this.vehicle);
          },
          error => {
            this.alertService.error(error);
          });

        this.form = this.formBuilder.group( {
          makes: ['', Validators.required],
          model: ['', [Validators.required, Validators.maxLength(45)]],
          year: ['', [Validators.required, Validators.pattern('^([1-2]{1}[0-9]{3})$')]],
          color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
          mileage: ['', [Validators.required, Validators.maxLength(7), Validators.pattern('^([1-9]\\d{1}|[1-9]\\d{0,6})$')]],
          vehicleRegistrationNumber: ['', [Validators.required, Validators.maxLength(10)]],
          vehicleStatus: ['', Validators.required],
          vinNumber: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
          fuelTypes: ['', Validators.required],
          cityFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
          countryFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
          averageFuelConsumption: ['', [Validators.required, Validators.pattern('^([1-9]\\d{0,1}|[1-9]\\d{0,2}\\.\\d{1,2})$')]],
        });
      });
  }

  pushValues(vehicle: Vehicle){
    this.f.makes.setValue(vehicle.make);
    this.f.model.setValue(vehicle.model);
    this.f.year.setValue(vehicle.year);
    this.f.color.setValue(vehicle.color);
    this.f.mileage.setValue(vehicle.mileage);
    this.f.vehicleRegistrationNumber.setValue(vehicle.vehicleRegistrationNumber);
    this.f.vehicleStatus.setValue(vehicle.vehicleStatus);
    this.f.vinNumber.setValue(vehicle.vinNumber);
    this.f.fuelTypes.setValue(vehicle.fuelType);
    this.f.cityFuelConsumption.setValue(vehicle.cityFuelConsumption);
    this.f.countryFuelConsumption.setValue(vehicle.countryFuelConsumption);
    this.f.averageFuelConsumption.setValue(vehicle.averageFuelConsumption);
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    const vehicle: Vehicle = {
      id: this.vehicleId,
      make: this.f.makes.value,
      model: this.f.model.value,
      year: this.f.year.value,
      color: this.f.color.value,
      mileage: this.f.mileage.value,
      vinNumber: this.f.vinNumber.value,
      vehicleRegistrationNumber: this.f.vehicleRegistrationNumber.value,
      vehicleStatus: this.f.vehicleStatus.value,
      fuelType: this.f.fuelTypes.value,
      cityFuelConsumption: this.f.cityFuelConsumption.value,
      countryFuelConsumption: this.f.countryFuelConsumption.value,
      averageFuelConsumption: this.f.averageFuelConsumption.value,
      company: ''
    };

    this.vehicleService.updateVehicle(vehicle).subscribe(
      data => {
        this.alertService.success('Dane pojazdu zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.vehicleId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}
