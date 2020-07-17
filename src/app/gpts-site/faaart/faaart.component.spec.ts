import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaaartComponent } from './faaart.component';

describe('FaaartComponent', () => {
  let component: FaaartComponent;
  let fixture: ComponentFixture<FaaartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaaartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaaartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
