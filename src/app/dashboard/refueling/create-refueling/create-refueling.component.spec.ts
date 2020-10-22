import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRefuelingComponent } from './create-refueling.component';

describe('CreateRefuelingComponent', () => {
  let component: CreateRefuelingComponent;
  let fixture: ComponentFixture<CreateRefuelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRefuelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRefuelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
