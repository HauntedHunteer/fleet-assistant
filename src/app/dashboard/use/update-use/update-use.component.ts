import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { UseService } from '../use.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Use } from '../../../_models/use';
import { List } from '../../../_models/list';

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
  userId: string;
  tripTypes: List[] = [
    { backendValue: 'city', frontendText: 'Miejski' },
    { backendValue: 'country', frontendText: 'Pozamiejski' },
    { backendValue: 'average', frontendText: 'Mieszany' }
  ];

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
                this.userId = this.tokenStorageService.getUser().id;
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
          tripType: ['', Validators.required],
          description: ['', Validators.maxLength(255)]
        });
      });
  }

  pushValues(use: Use) {
    this.f.tripDate.setValue(use.tripDate);
    this.f.trip.setValue(use.trip);
    this.f.tripType.setValue(use.tripType);
    this.f.description.setValue(use.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const use: Use = {
      id: this.useId,
      vehicleId: this.vehicleId,
      userId: this.userId,
      trip: this.f.trip.value,
      tripDate: this.f.tripDate.value,
      tripType: this.f.tripType.value,
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
