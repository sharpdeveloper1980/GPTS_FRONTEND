import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GliCertificationComponent } from './gli-certification.component';

describe('GliCertificationComponent', () => {
  let component: GliCertificationComponent;
  let fixture: ComponentFixture<GliCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GliCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GliCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
