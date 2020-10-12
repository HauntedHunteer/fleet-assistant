import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDataComponent } from './create-user-data.component';

describe('CreateUserDataComponent', () => {
  let component: CreateUserDataComponent;
  let fixture: ComponentFixture<CreateUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
