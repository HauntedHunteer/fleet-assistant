import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStatisticsComponent } from './driver-statistics.component';

describe('DriverStatisticsComponent', () => {
  let component: DriverStatisticsComponent;
  let fixture: ComponentFixture<DriverStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
