import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TteResultComponent } from './tte-result.component';

describe('TteResultComponent', () => {
  let component: TteResultComponent;
  let fixture: ComponentFixture<TteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TteResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
