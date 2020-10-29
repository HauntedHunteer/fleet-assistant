import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DriversService } from '../../dashboard/drivers/drivers.service';
import { AlertService } from '../../_services/alert.service';

import { MustMatch } from '../../_helpers/must-match';
import { NewDriversAccount } from '../../_models/new-drivers-account';

@Component({
  selector: 'app-set-new-pwd-for-driver',
  templateUrl: './set-new-pwd-for-driver.component.html',
  styleUrls: ['./set-new-pwd-for-driver.component.css']
})
export class SetNewPwdForDriverComponent implements OnInit {
  form: FormGroup;
  query;
  passwordBody: NewDriversAccount;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private driversService: DriversService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.query = {
          u: params.u
        };
        this.driversService.getNewAccountPasswordToken(this.query).subscribe(
          data => {
            this.passwordBody = data;
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.passwordBody.newPassword = this.f.password.value;
    this.driversService.setNewPasswordForUser(this.passwordBody).subscribe(
      data => {
        console.log('passwd set');
        this.alertService.success('Hasło zostało pomyślnie ustawione', { keepAfterRouteChange : true});
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }

}
