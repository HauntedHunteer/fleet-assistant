import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.accountService.resetPassword(this.form.value).subscribe(
      data => {
        console.log('reset password ' + data.value);
        this.alertService.success('Nowe hasło zostało wysłane na podany adres E-mail ', { keepAfterRouteChange : true});
        this.router.navigate(['../login'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }

}
