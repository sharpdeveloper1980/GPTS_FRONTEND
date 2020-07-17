import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppCreateSummerSchoolComponent } from './opp-create-summer-school.component';

describe('OppCreateSummerSchoolComponent', () => {
  let component: OppCreateSummerSchoolComponent;
  let fixture: ComponentFixture<OppCreateSummerSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppCreateSummerSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppCreateSummerSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
