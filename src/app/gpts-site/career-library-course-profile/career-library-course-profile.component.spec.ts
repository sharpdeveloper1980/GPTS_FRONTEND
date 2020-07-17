import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLibraryCourseProfileComponent } from './career-library-course-profile.component';

describe('CareerLibraryCourseProfileComponent', () => {
  let component: CareerLibraryCourseProfileComponent;
  let fixture: ComponentFixture<CareerLibraryCourseProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerLibraryCourseProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLibraryCourseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
