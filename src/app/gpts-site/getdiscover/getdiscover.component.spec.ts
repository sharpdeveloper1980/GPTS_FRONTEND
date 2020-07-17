import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdiscoverComponent } from './getdiscover.component';

describe('GetdiscoverComponent', () => {
  let component: GetdiscoverComponent;
  let fixture: ComponentFixture<GetdiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
