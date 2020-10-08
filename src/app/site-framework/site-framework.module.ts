import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    FooterComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    material
  ],
  exports: [
    material,
    FooterComponent,
    AlertComponent
  ]
})
export class SiteFrameworkModule { }
