import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerlibraryComponent } from './careerlibrary.component';

describe('CareerlibraryComponent', () => {
  let component: CareerlibraryComponent;
  let fixture: ComponentFixture<CareerlibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerlibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerlibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
