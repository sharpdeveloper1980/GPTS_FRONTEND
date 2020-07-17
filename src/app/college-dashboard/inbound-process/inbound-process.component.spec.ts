import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundProcessComponent } from './inbound-process.component';

describe('InboundProcessComponent', () => {
  let component: InboundProcessComponent;
  let fixture: ComponentFixture<InboundProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
