import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VehicleService } from '../../vehicle/vehicle.service';
import { InspectionService } from '../inspection.service';
import { AlertService } from '../../../_services/alert.service';
import { Vehicle } from '../../../_models/vehicle';
import { Inspection } from '../../../_models/inspection';

@Component({
  selector: 'app-update-inspection',
  templateUrl: './update-inspection.component.html',
  styleUrls: ['./update-inspection.component.css']
})
export class UpdateInspectionComponent implements OnInit {
  form: FormGroup;
  vehicleId: string;
  vehicle: Vehicle;
  inspectionId: string;
  inspection: Inspection;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private inspectionService: InspectionService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      parameter => {
        this.inspectionId = parameter.id;
        this.inspectionService.getInspectionDetails(this.inspectionId).subscribe(
          inspectionData => {
            this.inspection = inspectionData;
            this.vehicleId = inspectionData.vehicleId;
            this.vehicleService.viewVehicleDetails(this.vehicleId).subscribe(
              vehicleData => {
                this.vehicle = vehicleData;
                this.pushValues(this.inspection);
              },
              error => {
                this.alertService.error(error);
              });
          },
          error => {
            this.alertService.error(error);
          });

        this.form = this.formBuilder.group( {
          inspectionDate: ['', Validators.required],
          expirationDate: ['', Validators.required],
          cost: ['', [Validators.required, Validators.pattern('^([0-9]\\d{0,2}|[0-9]\\d{0,2}\\.\\d{1,2})$')]],
          description: ['', Validators.maxLength(45)]
        });
      });
  }

  pushValues(inspection: Inspection){
    this.f.inspectionDate.setValue(inspection.inspectionDate);
    this.f.expirationDate.setValue(inspection.expirationDate);
    this.f.cost.setValue(inspection.cost);
    this.f.description.setValue(inspection.description);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const inspection: Inspection = {
      id: this.inspectionId,
      vehicleId: this.vehicleId,
      inspectionDate: this.f.inspectionDate.value,
      expirationDate: this.f.expirationDate.value,
      cost: this.f.cost.value,
      description: this.f.description.value
    };

    this.inspectionService.updateInspection(inspection).subscribe(
      data => {
        this.alertService.success('Dane przeglądu zaktualizowano pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../../details/' + this.inspectionId], {relativeTo: this.route});
      },
      error => {
        this.alertService.error(error);
      });
  }
}

