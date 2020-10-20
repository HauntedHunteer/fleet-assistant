import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RepairService } from '../repair.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Repair } from '../../../_models/repair';

@Component({
  selector: 'app-create-repair',
  templateUrl: './create-repair.component.html',
  styleUrls: ['./create-repair.component.css']
})
export class CreateRepairComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private repairService: RepairService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.vehicleId = params.idV;

        this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
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
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      repairDate: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,5}|[0-9]\\d{0,5}\\.\\d{1,2})$')]],
      description: ['', [ Validators.required, Validators.maxLength(100)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const repair: Repair = {
      id: '',
      vehicleId: this.vehicleId,
      title: this.f.title.value,
      repairDate: this.f.repairDate.value,
      cost: this.f.cost.value,
      description: this.f.description.value
    };
    this.repairService.createRepair(repair).subscribe(
      data => {
        this.alertService.success('Naprawę dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
      },
      error => {
        this.alertService.error(error);
      });
  }
}

