import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNewPwdForDriverComponent } from './set-new-pwd-for-driver.component';

describe('SetNewPwdForDriverComponent', () => {
  let component: SetNewPwdForDriverComponent;
  let fixture: ComponentFixture<SetNewPwdForDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNewPwdForDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNewPwdForDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
