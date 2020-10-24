import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService} from '../../../account/account.service';
import { AlertService } from '../../../_services/alert.service';

import { MustMatch } from '../../../_helpers/must-match';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
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
      oldPassword: ['', Validators.required],
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
    this.accountService.changePassword(this.f.oldPassword.value, this.f.newPassword.value).subscribe(
      data => {
        console.log('passwd changed');
        this.alertService.success('Hasło zostało pomyślnie zmienione', { keepAfterRouteChange : true});
        this.router.navigate(['../details'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }
}

