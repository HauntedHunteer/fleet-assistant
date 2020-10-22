import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { RefuelingService } from '../refueling.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Refueling} from '../../../_models/refueling';

@Component({
  selector: 'app-update-refueling',
  templateUrl: './update-refueling.component.html',
  styleUrls: ['./update-refueling.component.css']
})
export class UpdateRefuelingComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  refuelingId: string;
  refueling: Refueling;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private refuelingService: RefuelingService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.refuelingId = parameter.id;
        this.refuelingService.getRefuelingDetails(this.refuelingId).subscribe(
          refuelingData => {
            this.refueling = refuelingData;
            this.vehicleId = refuelingData.vehicleId;
            this.vehicleService.getVehicleDetails(this.vehicleId).subscribe(
              vehicleData => {
                this.vehicle = vehicleData;
                this.pushValues(this.refueling);
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
      });
  }

  pushValues(refueling: Refueling){
    this.f.cost.setValue(refueling.cost);
    this.f.litre.setValue(refueling.litre);
    this.f.refuelingDate.setValue(refueling.refuelingDate);
    this.f.description.setValue(refueling.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const refueling: Refueling = {
      id: this.refuelingId,
      vehicleId: this.vehicleId,
      refuelingDate: this.f.refuelingDate.value,
      litre: this.f.litre.value,
      cost: this.f.cost.value,
      description: this.f.description.value,
    };

    this.refuelingService.updateRefueling(refueling).subscribe(
      data => {
        this.alertService.success('Dane tankowania zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.refuelingId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}

