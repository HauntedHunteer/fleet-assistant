import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInsuranceComponent } from './details-insurance.component';

describe('DetailsInsuranceComponent', () => {
  let component: DetailsInsuranceComponent;
  let fixture: ComponentFixture<DetailsInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
