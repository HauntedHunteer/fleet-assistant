import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSharedVehicleComponent } from './list-shared-vehicle.component';

describe('ListSharedVehicleComponent', () => {
  let component: ListSharedVehicleComponent;
  let fixture: ComponentFixture<ListSharedVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSharedVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSharedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
