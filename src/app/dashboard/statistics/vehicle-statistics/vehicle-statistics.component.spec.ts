import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStatisticsComponent } from './vehicle-statistics.component';

describe('VehicleStatisticsComponent', () => {
  let component: VehicleStatisticsComponent;
  let fixture: ComponentFixture<VehicleStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
