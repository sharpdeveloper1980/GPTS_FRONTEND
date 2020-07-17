import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAppStatusComponent } from './one-app-status.component';

describe('OneAppStatusComponent', () => {
  let component: OneAppStatusComponent;
  let fixture: ComponentFixture<OneAppStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneAppStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAppStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
