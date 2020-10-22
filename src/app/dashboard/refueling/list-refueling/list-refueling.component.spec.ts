import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRefuelingComponent } from './list-refueling.component';

describe('ListRefuelingComponent', () => {
  let component: ListRefuelingComponent;
  let fixture: ComponentFixture<ListRefuelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRefuelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRefuelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
