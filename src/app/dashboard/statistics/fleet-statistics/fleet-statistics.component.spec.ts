import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetStatisticsComponent } from './fleet-statistics.component';

describe('FleetStatisticsComponent', () => {
  let component: FleetStatisticsComponent;
  let fixture: ComponentFixture<FleetStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
