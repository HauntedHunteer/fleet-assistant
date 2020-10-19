import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInspectionComponent } from './update-inspection.component';

describe('UpdateInspectionComponent', () => {
  let component: UpdateInspectionComponent;
  let fixture: ComponentFixture<UpdateInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
