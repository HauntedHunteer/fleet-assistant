import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { InsuranceService } from '../insurance.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Insurance} from '../../../_models/insurance';
import { InsuranceType } from '../../../_models/insurance-type';;

@Component({
  selector: 'app-update-insurance',
  templateUrl: './update-insurance.component.html',
  styleUrls: ['./update-insurance.component.css']
})
export class UpdateInsuranceComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  insuranceId: string;
  insurance: Insurance;
  insuranceTypes: InsuranceType[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private insuranceService: InsuranceService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.insuranceId = parameter.id;
        this.insuranceService.getInsuranceDetails(this.insuranceId).subscribe(
          insuranceData => {
            this.insurance = insuranceData;
            this.insuranceService.getInsuranceTypes().subscribe(
              insuranceTypeData => {
                this.insuranceTypes = insuranceTypeData;
              },
              error => {
                this.alertService.error(error);
              });
            this.vehicleId = insuranceData.vehicleId;
            this.vehicleService.viewVehicleDetails(this.vehicleId).subscribe(
              vehicleData => {
                this.vehicle = vehicleData;
                this.pushValues(this.insurance);
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
      });
  }

  pushValues(insurance: Insurance){
    this.f.insuranceTypes.setValue(insurance.insuranceType);
    this.f.policyNumber.setValue(insurance.policyNumber);
    this.f.effectiveDate.setValue(insurance.effectiveDate);
    this.f.expirationDate.setValue(insurance.expirationDate);
    this.f.cost.setValue(insurance.cost);
    this.f.description.setValue(insurance.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const insurance: Insurance = {
      id: this.insuranceId,
      vehicleId: this.vehicleId,
      effectiveDate: this.f.effectiveDate.value,
      expirationDate: this.f.expirationDate.value,
      cost: this.f.cost.value,
      policyNumber: this.f.policyNumber.value,
      insuranceType: this.f.insuranceTypes.value,
      description: this.f.description.value
    };

    this.insuranceService.updateInsurance(insurance).subscribe(
      data => {
        this.alertService.success('Dane ubezpiecznia zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.insuranceId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}
