import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedSchoolsComponent } from './certified-schools.component';

describe('CertifiedSchoolsComponent', () => {
  let component: CertifiedSchoolsComponent;
  let fixture: ComponentFixture<CertifiedSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
