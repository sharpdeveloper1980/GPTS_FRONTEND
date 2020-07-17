import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipStatusComponent } from './scholarship-status.component';

describe('ScholarshipStatusComponent', () => {
  let component: ScholarshipStatusComponent;
  let fixture: ComponentFixture<ScholarshipStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScholarshipStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
