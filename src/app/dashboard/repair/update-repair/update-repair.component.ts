import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { RepairService } from '../repair.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Repair } from '../../../_models/repair';

@Component({
  selector: 'app-update-repair',
  templateUrl: './update-repair.component.html',
  styleUrls: ['./update-repair.component.css']
})
export class UpdateRepairComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  repairId: string;
  repair: Repair;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private repairService: RepairService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.repairId = parameter.id;
        this.repairService.getRepairDetails(this.repairId).subscribe(
          repairData => {
            this.repair = repairData;
            this.vehicleId = repairData.vehicleId;
            this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
              vehicleData => {
                this.vehicle = vehicleData;
                this.pushValues(this.repair);
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
          description: ['', [ Validators.required, Validators.maxLength(555)]]
        });
      });
  }

  pushValues(repair: Repair){
    this.f.title.setValue(repair.title);
    this.f.repairDate.setValue(repair.repairDate);
    this.f.cost.setValue(repair.cost);
    this.f.description.setValue(repair.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const repair: Repair = {
      id: this.repairId,
      vehicleId: this.vehicleId,
      title: this.f.title.value,
      repairDate: this.f.repairDate.value,
      cost: this.f.cost.value,
      description: this.f.description.value
    };

    this.repairService.updateRepair(repair).subscribe(
      data => {
        this.alertService.success('Dane naprawy zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.repairId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}


