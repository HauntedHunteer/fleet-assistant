import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InsuranceService } from '../insurance.service';
import { VehicleService } from '../../vehicle/vehicle.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Insurance } from '../../../_models/insurance';
import { InsuranceType } from '../../../_models/insurance-type';

@Component({
  selector: 'app-create-insurance',
  templateUrl: './create-insurance.component.html',
  styleUrls: ['./create-insurance.component.css']
})
export class CreateInsuranceComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  insuranceTypes: InsuranceType[];
  query;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private insuranceService: InsuranceService,
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
            this.query = {
              idV: this.vehicleId
            };

            this.insuranceService.getInsuranceTypes().subscribe(
              insuranceTypeData => {
                this.insuranceTypes = insuranceTypeData;
              },
              error => {
                this.alertService.error(error);
              });
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group( {
      insuranceTypes: ['', Validators.required],
      policyNumber: ['', [Validators.required, Validators.maxLength(25)]],
      effectiveDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cost: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,5}|[0-9]\\d{0,5}\\.\\d{1,2})$')]],
      description: ['', Validators.maxLength(100)]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const insurance: Insurance = {
      id: '',
      vehicleId: this.vehicleId,
      effectiveDate: this.f.effectiveDate.value,
      expirationDate: this.f.expirationDate.value,
      cost: this.f.cost.value,
      policyNumber: this.f.policyNumber.value,
      insuranceType: this.f.insuranceTypes.value.name,
      description: this.f.description.value
    };
    this.insuranceService.createInsurance(insurance).subscribe(
      data => {
        this.alertService.success('Ubezpieczenie dodano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], {relativeTo: this.route, queryParams: { idV: this.vehicleId}});
      },
      error => {
        this.alertService.error(error);
      });
  }
}

