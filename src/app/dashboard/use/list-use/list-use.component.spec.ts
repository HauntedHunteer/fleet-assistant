import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUseComponent } from './list-use.component';

describe('ListUseComponent', () => {
  let component: ListUseComponent;
  let fixture: ComponentFixture<ListUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
