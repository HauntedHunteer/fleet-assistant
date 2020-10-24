import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUseComponent } from './create-use.component';

describe('CreateUseComponent', () => {
  let component: CreateUseComponent;
  let fixture: ComponentFixture<CreateUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
