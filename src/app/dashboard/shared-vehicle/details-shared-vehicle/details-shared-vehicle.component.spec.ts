import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSharedVehicleComponent } from './details-shared-vehicle.component';

describe('DetailsSharedVehicleComponent', () => {
  let component: DetailsSharedVehicleComponent;
  let fixture: ComponentFixture<DetailsSharedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSharedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSharedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
