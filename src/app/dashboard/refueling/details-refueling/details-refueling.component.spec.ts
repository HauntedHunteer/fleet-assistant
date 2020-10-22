import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRefuelingComponent } from './details-refueling.component';

describe('DetailsRefuelingComponent', () => {
  let component: DetailsRefuelingComponent;
  let fixture: ComponentFixture<DetailsRefuelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRefuelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRefuelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
