import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDiscoveryComponent } from './career-discovery.component';

describe('CareerDiscoveryComponent', () => {
  let component: CareerDiscoveryComponent;
  let fixture: ComponentFixture<CareerDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerDiscoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
