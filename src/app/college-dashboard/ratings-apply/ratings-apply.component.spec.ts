import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsApplyComponent } from './ratings-apply.component';

describe('RatingsApplyComponent', () => {
  let component: RatingsApplyComponent;
  let fixture: ComponentFixture<RatingsApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
