import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerlibraryRegisteredComponent } from './careerlibrary-registered.component';

describe('CareerlibraryRegisteredComponent', () => {
  let component: CareerlibraryRegisteredComponent;
  let fixture: ComponentFixture<CareerlibraryRegisteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerlibraryRegisteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerlibraryRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
