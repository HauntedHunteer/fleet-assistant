import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUseComponent } from './details-use.component';

describe('DetailsUseComponent', () => {
  let component: DetailsUseComponent;
  let fixture: ComponentFixture<DetailsUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
