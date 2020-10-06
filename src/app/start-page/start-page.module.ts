import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartPageRoutingModule } from './start-page-routing.module';
import { StartPageComponent } from './start-page.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { DevelopmentSectionComponent } from './development-section/development-section.component';
import { OverviewSectionComponent } from './overview-section/overview-section.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    StartPageComponent,
    TopHeaderComponent,
    DevelopmentSectionComponent,
    OverviewSectionComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    StartPageRoutingModule
  ],
  exports: [
    StartPageComponent,
    FooterComponent
  ]
})
export class StartPageModule { }
