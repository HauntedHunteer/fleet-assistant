import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDataService } from '../../user-data/user-data.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { DriversService } from '../drivers.service';
import { AlertService } from '../../../_services/alert.service';
import { UserData } from '../../../_models/user-data';
import { Vehicle } from '../../../_models/vehicle';
import { Share } from '../../../_models/share';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.css']
})
export class AssignVehicleComponent implements OnInit {
  form: FormGroup;
  userData: UserData;
  driverId: string;
  vehiclesList: Vehicle[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private vehicleService: VehicleService,
    private driversService: DriversService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.driverId = parameter.id;
        this.userDataService.getUserData(this.driverId).subscribe(
          dataUser => {
            this.userData = dataUser;
          });
        this.vehicleService.getVehicleListToShare().subscribe(
          dataVehicles => {
            this.vehiclesList = dataVehicles;
          },
          error => {
            this.alertService.error(error);
          });

        this.form = this.formBuilder.group( {
          vehiclesList: ['', Validators.required]
        });
      });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const share: Share = {
      userId: this.driverId,
      vehicleId: this.f.vehiclesList.value
    };

    this.driversService.createShareVehicle(share).subscribe(
      data => {
        this.alertService.success('Pojazdy zostały pomyślnie przypisane', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.driverId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}

