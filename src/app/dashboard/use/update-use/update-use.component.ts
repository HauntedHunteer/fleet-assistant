import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { UseService } from '../use.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Use } from '../../../_models/use';

@Component({
  selector: 'app-update-use',
  templateUrl: './update-use.component.html',
  styleUrls: ['./update-use.component.css']
})
export class UpdateUseComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  useId: string;
  use: Use;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private useService: UseService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.useId = parameter.id;
        this.useService.getUseDetails(this.useId).subscribe(
          useData => {
            this.use = useData;
            this.vehicleId = useData.vehicleId;
            this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
              vehicleData => {
                this.vehicle = vehicleData;
                this.pushValues(this.use);
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
          description: ['', Validators.maxLength(255)]
        });
      });
  }

  pushValues(use: Use) {
    this.f.tripDate.setValue(use.tripDate);
    this.f.trip.setValue(use.trip);
    this.f.description.setValue(use.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const use: Use = {
      id: this.useId,
      vehicleId: this.vehicleId,
      trip: this.f.trip.value,
      tripDate: this.f.tripDate.value,
      description: this.f.description.value
    };

    this.useService.updateUse(use).subscribe(
      data => {
        this.alertService.success('Dane przebiegu zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.useId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}
