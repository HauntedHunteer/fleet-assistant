import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserDataComponent } from './details-user-data.component';

describe('DetailsUserDataComponent', () => {
  let component: DetailsUserDataComponent;
  let fixture: ComponentFixture<DetailsUserDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUserDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
