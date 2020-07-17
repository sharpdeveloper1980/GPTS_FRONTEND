import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSolutionComponent } from './our-solution.component';

describe('OurSolutionComponent', () => {
  let component: OurSolutionComponent;
  let fixture: ComponentFixture<OurSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
