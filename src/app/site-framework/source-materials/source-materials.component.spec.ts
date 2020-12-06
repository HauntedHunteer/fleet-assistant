import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMaterialsComponent } from './source-materials.component';

describe('SourceMaterialsComponent', () => {
  let component: SourceMaterialsComponent;
  let fixture: ComponentFixture<SourceMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
