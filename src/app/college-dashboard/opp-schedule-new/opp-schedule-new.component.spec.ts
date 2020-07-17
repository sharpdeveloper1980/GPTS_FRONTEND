import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppScheduleNewComponent } from './opp-schedule-new.component';

describe('OppScheduleNewComponent', () => {
  let component: OppScheduleNewComponent;
  let fixture: ComponentFixture<OppScheduleNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppScheduleNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppScheduleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
