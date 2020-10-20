import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRepairComponent } from './details-repair.component';

describe('DetailsRepairComponent', () => {
  let component: DetailsRepairComponent;
  let fixture: ComponentFixture<DetailsRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
