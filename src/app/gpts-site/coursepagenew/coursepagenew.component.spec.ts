import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepagenewComponent } from './coursepagenew.component';

describe('CoursepagenewComponent', () => {
  let component: CoursepagenewComponent;
  let fixture: ComponentFixture<CoursepagenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepagenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepagenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
