import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdieoDetailComponent } from './edieo-detail.component';

describe('EdieoDetailComponent', () => {
  let component: EdieoDetailComponent;
  let fixture: ComponentFixture<EdieoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdieoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdieoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
