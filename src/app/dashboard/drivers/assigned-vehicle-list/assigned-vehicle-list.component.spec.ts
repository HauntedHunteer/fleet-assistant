import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedVehicleListComponent } from './assigned-vehicle-list.component';

describe('AssignedVehicleListComponent', () => {
  let component: AssignedVehicleListComponent;
  let fixture: ComponentFixture<AssignedVehicleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedVehicleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
