import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMustwatchComponent } from './empty-mustwatch.component';

describe('EmptyMustwatchComponent', () => {
  let component: EmptyMustwatchComponent;
  let fixture: ComponentFixture<EmptyMustwatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyMustwatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyMustwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
