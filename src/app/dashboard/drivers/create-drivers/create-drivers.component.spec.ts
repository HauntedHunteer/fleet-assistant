import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDriversComponent } from './create-drivers.component';

describe('CreateDriversComponent', () => {
  let component: CreateDriversComponent;
  let fixture: ComponentFixture<CreateDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
