import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCollegeComponent } from './design-college.component';

describe('DesignCollegeComponent', () => {
  let component: DesignCollegeComponent;
  let fixture: ComponentFixture<DesignCollegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignCollegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
