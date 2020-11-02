import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedVehicleComponent } from './shared-vehicle.component';

describe('SharedVehicleComponent', () => {
  let component: SharedVehicleComponent;
  let fixture: ComponentFixture<SharedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
