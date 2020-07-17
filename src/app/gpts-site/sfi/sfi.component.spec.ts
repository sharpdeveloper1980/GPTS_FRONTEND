import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfiComponent } from './sfi.component';

describe('SfiComponent', () => {
  let component: SfiComponent;
  let fixture: ComponentFixture<SfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
