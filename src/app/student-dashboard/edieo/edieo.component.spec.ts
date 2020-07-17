import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdieoComponent } from './edieo.component';

describe('EdieoComponent', () => {
  let component: EdieoComponent;
  let fixture: ComponentFixture<EdieoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdieoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdieoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
