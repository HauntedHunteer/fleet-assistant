import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../account.service';
import { AlertService } from '../../_services/alert.service';

import { MustMatch } from '../../_helpers/must-match';
import { ResetPwd } from '../../_models/reset-pwd';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  form: FormGroup;
  query;
  newPasswordBody: ResetPwd;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.query = {
          u: params.u,
          c: params.c
        };
        this.accountService.getResetPasswordToken(this.query).subscribe(
          data => {
            this.newPasswordBody = data;
          },
          error => {
            this.alertService.error(error);
          });
      },
      error => {
        this.alertService.error(error);
      });

    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.newPasswordBody.new_password = this.f.newPassword.value;
    this.accountService.setNewPassword(this.newPasswordBody).subscribe(
      data => {
        console.log('passwd reset');
        this.alertService.success('Hasło zostało pomyślnie zresetowane', { keepAfterRouteChange : true});
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }
}


