import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsNotificationComponent } from './events-notification.component';

describe('EventsNotificationComponent', () => {
  let component: EventsNotificationComponent;
  let fixture: ComponentFixture<EventsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
