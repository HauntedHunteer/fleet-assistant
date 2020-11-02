import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserDataService } from '../user-data.service';
import { TokenStorageService } from '../../../account/token-storage.service';
import { AlertService } from '../../../_services/alert.service';
import { UserData } from '../../../_models/user-data';
import {User} from '../../../_models/user';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {
  currentUser: User;
  userData: UserData;
  userDataId: string;
  addressId: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userDataService: UserDataService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.userDataService.getUserData(this.currentUser.id).subscribe(
      data => {
        this.userData = data;
        this.userDataId = data.id;
        this.addressId = data.address.id;
        this.pushValues(this.userData);
      },
      error => {
        this.alertService.error(error);
      });

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

  pushValues(userData: UserData) {
    this.f.name.setValue(userData.name);
    this.f.surname.setValue(userData.surname);
    this.f.phoneNumber.setValue(userData.phoneNumber);
    this.f.city.setValue(userData.address.city);
    this.f.postalCode.setValue(userData.address.postalCode);
    this.f.street.setValue(userData.address.street);
    this.f.buildingNumber.setValue(userData.address.buildingNumber);
    this.f.flatNumber.setValue(userData.address.flatNumber);
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const userData: UserData = {
      id: this.userDataId,
      name: this.f.name.value,
      surname: this.f.surname.value,
      phoneNumber: this.f.phoneNumber.value,
      email: null,
      address: {
        id: this.addressId,
        city: this.f.city.value,
        postalCode: this.f.postalCode.value,
        street: this.f.street.value,
        buildingNumber: this.f.buildingNumber.value,
        flatNumber: this.f.flatNumber.value
      }
    };

    this.userDataService.updateUserData(userData).subscribe(
      data => {
        this.alertService.success('Dane zaktualizowno pomyślnie', { keepAfterRouteChange : true});
        this.router.navigate(['../details'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }
}
