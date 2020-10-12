import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const material = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  FlexLayoutModule,
  MatMenuModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    FooterComponent,
    AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    material
  ],
  exports: [
    material,
    FooterComponent,
    AlertComponent
  ]
})
export class SiteFrameworkModule { }
