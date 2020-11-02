import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDataService } from '../user-data.service';
import { AlertService } from '../../../_services/alert.service';
import { UserData } from '../../../_models/user-data';

@Component({
  selector: 'app-create-user-data',
  templateUrl: './create-user-data.component.html',
  styleUrls: ['./create-user-data.component.css']
})
export class CreateUserDataComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group( {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15), Validators.pattern('(^(\\+? *[0-9]+)([,0-9 ]*)([0-9 ])*$)|(^ *$)')]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{2}\\-[0-9]{3}')]],
      street: ['', [Validators.minLength(3), Validators.maxLength(45)]],
      buildingNumber: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]{1,5}')]],
      flatNumber: ['', [Validators.minLength(1), Validators.maxLength(5)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const userData: UserData = {
      id: '',
      name: this.f.name.value,
      surname: this.f.surname.value,
      phoneNumber: this.f.phoneNumber.value,
      email: null,
      address: {
        id: '',
        city: this.f.city.value,
        postalCode: this.f.postalCode.value,
        street: this.f.street.value,
        buildingNumber: this.f.buildingNumber.value,
        flatNumber: this.f.flatNumber.value
      }
    };
    this.userDataService.createUserData(userData).subscribe(
      data => {
        this.alertService.success('Dane zaktualizowno pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../details'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }
}
