import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstudentDashboardComponent } from './newstudent-dashboard.component';

describe('NewstudentDashboardComponent', () => {
  let component: NewstudentDashboardComponent;
  let fixture: ComponentFixture<NewstudentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstudentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
