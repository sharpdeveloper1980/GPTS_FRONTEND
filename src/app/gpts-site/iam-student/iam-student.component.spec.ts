import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamStudentComponent } from './iam-student.component';

describe('IamStudentComponent', () => {
  let component: IamStudentComponent;
  let fixture: ComponentFixture<IamStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
