import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMyfavComponent } from './empty-myfav.component';

describe('EmptyMyfavComponent', () => {
  let component: EmptyMyfavComponent;
  let fixture: ComponentFixture<EmptyMyfavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyMyfavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyMyfavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
