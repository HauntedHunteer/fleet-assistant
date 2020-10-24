import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUseComponent } from './update-use.component';

describe('UpdateUseComponent', () => {
  let component: UpdateUseComponent;
  let fixture: ComponentFixture<UpdateUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
