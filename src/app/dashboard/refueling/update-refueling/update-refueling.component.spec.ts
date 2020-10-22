import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRefuelingComponent } from './update-refueling.component';

describe('UpdateRefuelingComponent', () => {
  let component: UpdateRefuelingComponent;
  let fixture: ComponentFixture<UpdateRefuelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRefuelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRefuelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
