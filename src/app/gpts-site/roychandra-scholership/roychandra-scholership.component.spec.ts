import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoychandraScholershipComponent } from './roychandra-scholership.component';

describe('RoychandraScholershipComponent', () => {
  let component: RoychandraScholershipComponent;
  let fixture: ComponentFixture<RoychandraScholershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoychandraScholershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoychandraScholershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
