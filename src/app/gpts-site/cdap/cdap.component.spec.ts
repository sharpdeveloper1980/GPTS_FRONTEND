import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdapComponent } from './cdap.component';

describe('CdapComponent', () => {
  let component: CdapComponent;
  let fixture: ComponentFixture<CdapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
