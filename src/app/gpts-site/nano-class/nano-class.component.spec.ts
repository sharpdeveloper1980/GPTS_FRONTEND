import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NanoClassComponent } from './nano-class.component';

describe('NanoClassComponent', () => {
  let component: NanoClassComponent;
  let fixture: ComponentFixture<NanoClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NanoClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NanoClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
