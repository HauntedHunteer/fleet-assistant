import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DriversService} from '../drivers.service';
import { AlertService} from '../../../_services/alert.service';

@Component({
  selector: 'app-create-drivers',
  templateUrl: './create-drivers.component.html',
  styleUrls: ['./create-drivers.component.css']
})
export class CreateDriversComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private driversService: DriversService,
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
    this.driversService.generateNewAccount(this.form.value).subscribe(
      data => {
        this.alertService.success('Na podany Email zostało wygenerowane konto kierowcy', { keepAfterRouteChange : true});
        this.router.navigate(['../list'], { relativeTo: this.route });
      },
      error => {
        this.alertService.error(error);
      });
  }

}
