import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentSectionComponent } from './development-section.component';

describe('DevelopmentSectionComponent', () => {
  let component: DevelopmentSectionComponent;
  let fixture: ComponentFixture<DevelopmentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
