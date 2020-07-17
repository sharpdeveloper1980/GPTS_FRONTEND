import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepageInternalComponent } from './coursepage-internal.component';

describe('CoursepageInternalComponent', () => {
  let component: CoursepageInternalComponent;
  let fixture: ComponentFixture<CoursepageInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepageInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepageInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
